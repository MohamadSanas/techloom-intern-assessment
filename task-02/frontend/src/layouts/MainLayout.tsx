import { Outlet, Link } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
            E-Shop
          </Link>
          <nav className="flex space-x-6">
            <Link to="/products" className="text-sm font-medium hover:text-blue-600 transition-colors">Products</Link>
            <Link to="/cart" className="text-sm font-medium hover:text-blue-600 transition-colors relative">
              Cart
            </Link>
            <Link to="/orders" className="text-sm font-medium hover:text-blue-600 transition-colors">Orders</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-300 py-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} E-Shop Checkout System. All rights reserved.</p>
      </footer>
    </div>
  );
}
