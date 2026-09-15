from datetime import datetime, timedelta, timezone
from uuid import UUID
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.cart import Cart
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.reservation import Reservation
from app.schemas.checkout import CheckoutRequest

class CheckoutService:
    def checkout(self, db: Session, cart_id: UUID, req: CheckoutRequest) -> Order:
        cart = db.query(Cart).filter(Cart.id == cart_id).first()
        if not cart:
            raise HTTPException(status_code=404, detail="Cart not found")
        
        if not cart.items:
            raise HTTPException(status_code=400, detail="Cart is empty")

        # Check idempotency: Did we already process this checkout? (Mock implementation, ideally we have an idempotency table or use payment idempotency)
        # For simplicity, we just look for an order with this cart_id (assuming 1 order per cart)
        existing_order = db.query(Order).filter(Order.cart_id == cart_id).first()
        if existing_order:
            return existing_order

        total_amount = 0.0
        
        # Validate stock and calculate total
        for item in cart.items:
            if item.product.stock < item.quantity:
                raise HTTPException(status_code=400, detail=f"Not enough stock for product {item.product.name}")
            total_amount += item.product.price * item.quantity
            
        # Create Order (RESERVED)
        order = Order(cart_id=cart_id, status="RESERVED", total_amount=total_amount)
        db.add(order)
        db.flush() # flush to get order.id
        
        # Reserve Stock
        expires_at = datetime.now(timezone.utc) + timedelta(minutes=15)
        for item in cart.items:
            # Create order item
            order_item = OrderItem(
                order_id=order.id, 
                product_id=item.product_id, 
                quantity=item.quantity, 
                unit_price=item.product.price
            )
            db.add(order_item)
            
            # Decrease product stock
            item.product.stock -= item.quantity
            
            # Create reservation
            reservation = Reservation(
                order_id=order.id,
                product_id=item.product_id,
                quantity=item.quantity,
                status="ACTIVE",
                expires_at=expires_at
            )
            db.add(reservation)
            
        db.commit()
        db.refresh(order)
        return order

    def release_expired_reservations(self, db: Session):
        now = datetime.now(timezone.utc)
        expired_reservations = db.query(Reservation).filter(
            Reservation.status == "ACTIVE",
            Reservation.expires_at < now
        ).all()

        for res in expired_reservations:
            # Restore stock
            res.product.stock += res.quantity
            res.status = "EXPIRED"
            # Expire order if it's still RESERVED
            if res.order.status == "RESERVED":
                res.order.status = "EXPIRED"
                
        db.commit()

checkout_service = CheckoutService()
