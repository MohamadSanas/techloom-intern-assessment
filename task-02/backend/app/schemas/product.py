from typing import Optional
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, Field

class ProductBase(BaseModel):
    name: str
    description: str
    category: str
    price: float
    stock: int

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    stock: Optional[int] = None

class ProductResponse(ProductBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
