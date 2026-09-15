import { Link, useNavigate } from 'react-router-dom';

export default function CartPage() {
  const navigate = useNavigate();
  // Using a mock cart state for simplicity in effort 0.50 since we'd need local storage to sync the cart_id
  const cartItems = [
    { id: '1', name: 'Premium Wireless Headphones', price: 299.99, quantity: 1, category: 'Electronics' }
  ];
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-slate-900">Your cart is empty</h2>
          <p className="text-slate-500 mt-2">Looks like you haven't added anything yet.</p>
          <Link to="/products" className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">Browse Products</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center text-3xl">🛍️</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{item.name}</h3>
                  <p className="text-sm text-slate-500">{item.category}</p>
                  <div className="mt-2 font-bold text-slate-900">${item.price.toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-900">Qty: {item.quantity}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2 text-slate-600">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 text-slate-600">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="border-t border-slate-100 pt-4 flex justify-between mb-6">
              <span className="font-bold text-slate-900">Total</span>
              <span className="font-black text-xl text-slate-900">${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
