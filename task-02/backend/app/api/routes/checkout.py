from uuid import UUID
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.schemas.checkout import CheckoutRequest
from app.schemas.order import OrderResponse
from app.services.checkout_service import checkout_service

router = APIRouter()

@router.post("/{cart_id}/checkout", response_model=OrderResponse)
def checkout(cart_id: UUID, req: CheckoutRequest, db: Session = Depends(get_db)):
    return checkout_service.checkout(db, cart_id, req)
