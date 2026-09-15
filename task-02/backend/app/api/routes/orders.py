from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.schemas.order import OrderResponse
from app.services.order_service import order_service

router = APIRouter()

@router.get("/", response_model=List[OrderResponse])
def get_orders(db: Session = Depends(get_db)):
    return order_service.get_orders(db)

@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: UUID, db: Session = Depends(get_db)):
    return order_service.get_order(db, order_id)

@router.post("/{order_id}/cancel", response_model=OrderResponse)
def cancel_order(order_id: UUID, db: Session = Depends(get_db)):
    return order_service.cancel_order(db, order_id)
