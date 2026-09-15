from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import products, carts, checkout, orders, payments, refunds

app = FastAPI(title="E-Commerce Checkout API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(carts.router, prefix="/api/carts", tags=["carts"])
app.include_router(checkout.router, prefix="/api/carts", tags=["checkout"])
app.include_router(orders.router, prefix="/api/orders", tags=["orders"])
app.include_router(payments.router, prefix="/api/orders", tags=["payments"])
app.include_router(refunds.router, prefix="/api/refunds", tags=["refunds"])

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
