from uuid import UUID
from datetime import datetime
from pydantic import BaseModel
from typing import Optional

class PaymentRequest(BaseModel):
    idempotency_key: str
    mock_outcome: Optional[str] = "SUCCESS" # SUCCESS, FAILURE, TIMEOUT

class PaymentResponse(BaseModel):
    id: UUID
    order_id: UUID
    status: str
    amount: float
    idempotency_key: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
