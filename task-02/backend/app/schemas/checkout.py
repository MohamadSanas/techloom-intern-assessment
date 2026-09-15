from pydantic import BaseModel

class CheckoutRequest(BaseModel):
    idempotency_key: str
