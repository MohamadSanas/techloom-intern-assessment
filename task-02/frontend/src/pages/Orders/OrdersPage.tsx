import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { orderApi } from '../../services/api';

export default function OrdersPage() {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: () => orderApi.getOrders(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) return <div className="text-red-500 p-4 bg-red-50 rounded-lg">Error loading orders.</div>;

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Your Orders</h1>
      
      {!orders || orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-slate-900">No orders yet</h2>
          <p className="text-slate-500 mt-2">When you place orders, they will appear here.</p>
          <Link to="/products" className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order.id} to={`/orders/${order.id}`} className="block">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Order #{order.id.split('-')[0]}</div>
                  <div className="font-semibold text-slate-900">
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' :
                    order.status === 'CANCELLED' || order.status === 'FAILED' || order.status === 'EXPIRED' ? 'bg-rose-100 text-rose-700' :
                    order.status === 'REFUNDED' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-slate-500">Total</div>
                  <div className="text-lg font-bold text-slate-900">${order.total_amount.toFixed(2)}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
