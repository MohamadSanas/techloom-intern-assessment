from uuid import UUID
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.payment import Payment
from app.models.order import Order
from app.models.reservation import Reservation
from app.schemas.payment import PaymentRequest

class PaymentService:
    def process_payment(self, db: Session, order_id: UUID, req: PaymentRequest) -> Payment:
        order = db.query(Order).filter(Order.id == order_id).first()
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        if order.status != "RESERVED":
            raise HTTPException(status_code=400, detail=f"Order cannot be paid in current status: {order.status}")

        existing_payment = db.query(Payment).filter(Payment.idempotency_key == req.idempotency_key).first()
        if existing_payment:
            return existing_payment

        payment = Payment(
            order_id=order.id,
            amount=order.total_amount,
            idempotency_key=req.idempotency_key,
            status=req.mock_outcome
        )
        db.add(payment)
        
        reservations = db.query(Reservation).filter(Reservation.order_id == order.id, Reservation.status == "ACTIVE").all()

        if req.mock_outcome == "SUCCESS":
            order.status = "PAID"
            for res in reservations:
                res.status = "COMPLETED"
        elif req.mock_outcome == "FAILURE":
            order.status = "FAILED"
            for res in reservations:
                res.product.stock += res.quantity # Release stock
                res.status = "RELEASED"
        # If TIMEOUT, we leave it as PENDING/ACTIVE and let the cron job handle it.

        db.commit()
        db.refresh(payment)
        return payment

payment_service = PaymentService()
