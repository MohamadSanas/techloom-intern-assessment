from typing import List
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel

from app.schemas.product import ProductResponse

class CartItemBase(BaseModel):
    product_id: UUID
    quantity: int

class CartItemCreate(CartItemBase):
    pass

class CartItemUpdate(BaseModel):
    quantity: int

class CartItemResponse(CartItemBase):
    id: UUID
    product: ProductResponse

    class Config:
        from_attributes = True

class CartResponse(BaseModel):
    id: UUID
    items: List[CartItemResponse] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
