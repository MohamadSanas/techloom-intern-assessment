import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProductsList from './pages/Products/ProductsList';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import CartPage from './pages/Cart/CartPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import OrdersPage from './pages/Orders/OrdersPage';
import OrderDetailsPage from './pages/Orders/OrderDetailsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/products" replace />} />
        <Route path="products" element={<ProductsList />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="orders/:id" element={<OrderDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
