from uuid import UUID
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.order import Order
from app.models.payment import Payment
from app.models.refund import Refund

class OrderService:
    def get_orders(self, db: Session):
        return db.query(Order).all()

    def get_order(self, db: Session, order_id: UUID) -> Order:
        order = db.query(Order).filter(Order.id == order_id).first()
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return order

    def cancel_order(self, db: Session, order_id: UUID) -> Order:
        order = self.get_order(db, order_id)
        if order.status not in ["PAID", "PENDING", "RESERVED"]:
            raise HTTPException(status_code=400, detail="Order cannot be cancelled")
        
        if order.status == "PAID":
            # Initiate refund
            payment = db.query(Payment).filter(Payment.order_id == order.id, Payment.status == "SUCCESS").first()
            if payment:
                refund = Refund(order_id=order.id, payment_id=payment.id, amount=payment.amount, status="REFUNDED")
                db.add(refund)
            order.status = "REFUNDED"
        else:
            order.status = "CANCELLED"
            
        # Release stock for any ACTIVE reservations
        from app.models.reservation import Reservation
        reservations = db.query(Reservation).filter(Reservation.order_id == order.id, Reservation.status == "ACTIVE").all()
        for res in reservations:
            res.product.stock += res.quantity
            res.status = "RELEASED"
            
        db.commit()
        db.refresh(order)
        return order

order_service = OrderService()
