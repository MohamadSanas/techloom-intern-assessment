from uuid import UUID
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.schemas.payment import PaymentRequest, PaymentResponse
from app.services.payment_service import payment_service

router = APIRouter()

@router.post("/{order_id}/payments", response_model=PaymentResponse)
def process_payment(order_id: UUID, req: PaymentRequest, db: Session = Depends(get_db)):
    return payment_service.process_payment(db, order_id, req)
