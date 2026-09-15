from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.schemas.refund import RefundResponse
from app.models.refund import Refund

router = APIRouter()

@router.get("/", response_model=List[RefundResponse])
def get_refunds(db: Session = Depends(get_db)):
    return db.query(Refund).all()
