from uuid import UUID
from datetime import datetime
from pydantic import BaseModel

class RefundResponse(BaseModel):
    id: UUID
    order_id: UUID
    payment_id: UUID
    status: str
    amount: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
