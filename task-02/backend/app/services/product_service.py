from typing import List, Optional
from uuid import UUID
from sqlalchemy.orm import Session
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate

class ProductService:
    def get_product(self, db: Session, product_id: UUID) -> Optional[Product]:
        return db.query(Product).filter(Product.id == product_id).first()

    def get_products(self, db: Session, search: Optional[str] = None, category: Optional[str] = None, min_price: Optional[float] = None, max_price: Optional[float] = None, available: Optional[bool] = None) -> List[Product]:
        query = db.query(Product)
        if search:
            query = query.filter(Product.name.ilike(f"%{search}%") | Product.description.ilike(f"%{search}%"))
        if category:
            query = query.filter(Product.category == category)
        if min_price is not None:
            query = query.filter(Product.price >= min_price)
        if max_price is not None:
            query = query.filter(Product.price <= max_price)
        if available:
            query = query.filter(Product.stock > 0)
        return query.all()

    def create_product(self, db: Session, product_in: ProductCreate) -> Product:
        db_product = Product(**product_in.model_dump())
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        return db_product

    def update_product(self, db: Session, product_id: UUID, product_in: ProductUpdate) -> Optional[Product]:
        db_product = self.get_product(db, product_id)
        if not db_product:
            return None
        
        update_data = product_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_product, key, value)
            
        db.commit()
        db.refresh(db_product)
        return db_product

    def delete_product(self, db: Session, product_id: UUID) -> bool:
        db_product = self.get_product(db, product_id)
        if not db_product:
            return False
        db.delete(db_product)
        db.commit()
        return True

product_service = ProductService()
