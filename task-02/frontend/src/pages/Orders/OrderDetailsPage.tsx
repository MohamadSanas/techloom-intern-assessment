import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { orderApi } from '../../services/api';

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', id],
    queryFn: () => orderApi.getOrder(id!),
    enabled: !!id,
  });

  const cancelMutation = useMutation({
    mutationFn: () => orderApi.cancelOrder(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order', id] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !order) {
    return <div className="text-red-500 p-4 bg-red-50 rounded-lg">Error loading order details.</div>;
  }

  const canCancel = ['PENDING', 'RESERVED', 'PAID'].includes(order.status);

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <Link to="/orders" className="text-blue-600 hover:underline text-sm font-medium">← Back to Orders</Link>
      </div>
      
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Order #{order.id.split('-')[0]}</h1>
            <p className="text-slate-500 text-sm mt-1">Placed on {new Date(order.created_at).toLocaleString()}</p>
          </div>
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${
            order.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' :
            order.status === 'CANCELLED' || order.status === 'FAILED' || order.status === 'EXPIRED' ? 'bg-rose-100 text-rose-700' :
            order.status === 'REFUNDED' ? 'bg-amber-100 text-amber-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {order.status}
          </span>
        </div>
        
        <div className="p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Items</h2>
          <div className="space-y-4 mb-8">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-sm">🛍️</div>
                  <span className="font-medium text-slate-700">Product {item.product_id.split('-')[0]} x {item.quantity}</span>
                </div>
                <span className="font-semibold text-slate-900">${(item.unit_price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-slate-100 pt-6 flex justify-between items-center">
            <span className="text-lg font-bold text-slate-900">Total Amount</span>
            <span className="text-2xl font-black text-slate-900">${order.total_amount.toFixed(2)}</span>
          </div>
          
          {canCancel && (
            <div className="mt-8 pt-8 border-t border-slate-100">
              <button 
                onClick={() => {
                  if (confirm('Are you sure you want to cancel this order?')) {
                    cancelMutation.mutate();
                  }
                }}
                disabled={cancelMutation.isPending}
                className="px-6 py-2 bg-rose-50 text-rose-600 rounded-full font-bold hover:bg-rose-100 transition-colors disabled:opacity-50"
              >
                {cancelMutation.isPending ? 'Cancelling...' : 'Cancel Order'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
