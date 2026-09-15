from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.services.product_service import product_service

router = APIRouter()

@router.get("/", response_model=List[ProductResponse])
def get_products(
    search: Optional[str] = None,
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    available: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    return product_service.get_products(db, search, category, min_price, max_price, available)

@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: UUID, db: Session = Depends(get_db)):
    product = product_service.get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=ProductResponse, status_code=201)
def create_product(product_in: ProductCreate, db: Session = Depends(get_db)):
    return product_service.create_product(db, product_in)

@router.patch("/{product_id}", response_model=ProductResponse)
def update_product(product_id: UUID, product_in: ProductUpdate, db: Session = Depends(get_db)):
    product = product_service.update_product(db, product_id, product_in)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.delete("/{product_id}", status_code=204)
def delete_product(product_id: UUID, db: Session = Depends(get_db)):
    if not product_service.delete_product(db, product_id):
        raise HTTPException(status_code=404, detail="Product not found")
