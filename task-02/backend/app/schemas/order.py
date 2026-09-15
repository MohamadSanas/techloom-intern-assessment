from typing import List
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel

class OrderItemResponse(BaseModel):
    id: UUID
    product_id: UUID
    quantity: int
    unit_price: float

    class Config:
        from_attributes = True

class OrderResponse(BaseModel):
    id: UUID
    cart_id: UUID
    status: str
    total_amount: float
    items: List[OrderItemResponse] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
