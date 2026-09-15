import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handlePayment = (outcome: string) => {
    setStatus('processing');
    setTimeout(() => {
      if (outcome === 'SUCCESS') {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 animate-in zoom-in duration-500">
        <div className="text-8xl mb-6">🎉</div>
        <h1 className="text-4xl font-extrabold text-slate-900">Payment Successful!</h1>
        <p className="text-lg text-slate-600 mt-4">Your order has been confirmed and will be shipped soon.</p>
        <button onClick={() => navigate('/orders')} className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors">
          View Orders
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Checkout</h1>
      
      <div className="bg-slate-50 p-6 rounded-2xl mb-8">
        <h2 className="font-semibold text-slate-900 mb-2">Simulated Payment Gateway</h2>
        <p className="text-sm text-slate-500 mb-4">Choose an outcome below to test the state machine and reservation flow.</p>
        
        {status === 'error' && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium mb-4">
            Payment failed! The stock reservation has been released.
          </div>
        )}
        
        <div className="space-y-3">
          <button 
            disabled={status === 'processing'}
            onClick={() => handlePayment('SUCCESS')}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
          >
            {status === 'processing' ? <span className="animate-spin text-xl">↻</span> : '💰'} Simulate Success
          </button>
          
          <button 
            disabled={status === 'processing'}
            onClick={() => handlePayment('FAILURE')}
            className="w-full py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
          >
            ❌ Simulate Failure
          </button>
        </div>
      </div>
    </div>
  );
}
