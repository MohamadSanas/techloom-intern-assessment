from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.schemas.cart import CartResponse, CartItemCreate, CartItemUpdate
from app.services.cart_service import cart_service

router = APIRouter()

@router.post("/", response_model=CartResponse, status_code=201)
def create_cart(db: Session = Depends(get_db)):
    return cart_service.create_cart(db)

@router.get("/{cart_id}", response_model=CartResponse)
def get_cart(cart_id: UUID, db: Session = Depends(get_db)):
    cart = cart_service.get_cart(db, cart_id)
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    return cart

@router.post("/{cart_id}/items", response_model=CartResponse)
def add_item_to_cart(cart_id: UUID, item_in: CartItemCreate, db: Session = Depends(get_db)):
    return cart_service.add_item_to_cart(db, cart_id, item_in)

@router.patch("/{cart_id}/items/{item_id}", response_model=CartResponse)
def update_item_quantity(cart_id: UUID, item_id: UUID, item_in: CartItemUpdate, db: Session = Depends(get_db)):
    return cart_service.update_item_quantity(db, cart_id, item_id, item_in)

@router.delete("/{cart_id}/items/{item_id}", response_model=CartResponse)
def remove_item_from_cart(cart_id: UUID, item_id: UUID, db: Session = Depends(get_db)):
    return cart_service.remove_item_from_cart(db, cart_id, item_id)
