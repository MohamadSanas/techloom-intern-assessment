import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal
from app.models.product import Product

def seed_db():
    db = SessionLocal()
    
    # Check if products already exist
    if db.query(Product).count() > 0:
        print("Database already seeded with products.")
        db.close()
        return

    products = [
        Product(name="Premium Wireless Headphones", description="Noise-cancelling over-ear headphones with 40-hour battery life.", category="Electronics", price=299.99, stock=50),
        Product(name="Ergonomic Office Chair", description="Adjustable lumbar support and breathable mesh.", category="Furniture", price=199.50, stock=20),
        Product(name="Mechanical Keyboard", description="RGB backlit mechanical keyboard with tactile switches.", category="Electronics", price=129.99, stock=100),
        Product(name="Coffee Espresso Machine", description="Professional grade espresso maker for home.", category="Kitchen", price=450.00, stock=5),
        Product(name="Yoga Mat", description="Eco-friendly, non-slip yoga mat.", category="Fitness", price=35.00, stock=200),
        Product(name="Limited Edition Sneakers", description="Rare designer sneakers.", category="Apparel", price=250.00, stock=0),
    ]

    db.add_all(products)
    db.commit()
    print("Successfully seeded the database with mock products!")
    db.close()

if __name__ == "__main__":
    seed_db()
