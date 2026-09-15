from typing import Optional
from uuid import UUID
from sqlalchemy.orm import Session
from app.models.cart import Cart, CartItem
from app.models.product import Product
from app.schemas.cart import CartItemCreate, CartItemUpdate
from fastapi import HTTPException

class CartService:
    def create_cart(self, db: Session) -> Cart:
        db_cart = Cart()
        db.add(db_cart)
        db.commit()
        db.refresh(db_cart)
        return db_cart

    def get_cart(self, db: Session, cart_id: UUID) -> Optional[Cart]:
        return db.query(Cart).filter(Cart.id == cart_id).first()

    def add_item_to_cart(self, db: Session, cart_id: UUID, item_in: CartItemCreate) -> Cart:
        cart = self.get_cart(db, cart_id)
        if not cart:
            raise HTTPException(status_code=404, detail="Cart not found")
            
        product = db.query(Product).filter(Product.id == item_in.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        existing_item = db.query(CartItem).filter(CartItem.cart_id == cart_id, CartItem.product_id == item_in.product_id).first()
        if existing_item:
            existing_item.quantity += item_in.quantity
        else:
            new_item = CartItem(cart_id=cart_id, product_id=item_in.product_id, quantity=item_in.quantity)
            db.add(new_item)
            
        db.commit()
        db.refresh(cart)
        return cart

    def update_item_quantity(self, db: Session, cart_id: UUID, item_id: UUID, item_in: CartItemUpdate) -> Cart:
        cart = self.get_cart(db, cart_id)
        if not cart:
            raise HTTPException(status_code=404, detail="Cart not found")
            
        item = db.query(CartItem).filter(CartItem.id == item_id, CartItem.cart_id == cart_id).first()
        if not item:
            raise HTTPException(status_code=404, detail="Item not found in cart")
            
        if item_in.quantity <= 0:
            db.delete(item)
        else:
            item.quantity = item_in.quantity
            
        db.commit()
        db.refresh(cart)
        return cart

    def remove_item_from_cart(self, db: Session, cart_id: UUID, item_id: UUID) -> Cart:
        cart = self.get_cart(db, cart_id)
        if not cart:
            raise HTTPException(status_code=404, detail="Cart not found")
            
        item = db.query(CartItem).filter(CartItem.id == item_id, CartItem.cart_id == cart_id).first()
        if not item:
            raise HTTPException(status_code=404, detail="Item not found in cart")
            
        db.delete(item)
        db.commit()
        db.refresh(cart)
        return cart

cart_service = CartService()
