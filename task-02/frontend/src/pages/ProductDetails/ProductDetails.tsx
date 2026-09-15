import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { productApi } from '../../services/api';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProduct(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-900">Product not found</h2>
        <p className="text-slate-500 mt-2">The product you are looking for does not exist.</p>
        <Link to="/products" className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">Return to Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="md:flex">
        <div className="md:w-1/2 bg-slate-50 flex items-center justify-center p-12 relative min-h-[300px]">
          <div className="text-9xl">🛍️</div>
          {product.stock <= 0 && (
            <div className="absolute top-6 left-6 bg-red-100 text-red-700 font-bold px-3 py-1.5 rounded-full shadow-sm text-sm">Out of Stock</div>
          )}
        </div>
        
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-sm text-blue-600 font-semibold uppercase tracking-wider mb-2">{product.category}</div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">{product.name}</h1>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">{product.description}</p>
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-3xl font-black text-slate-900">${product.price.toFixed(2)}</span>
            </div>
            <div className="text-sm font-medium text-slate-500">
              <span className={product.stock > 0 ? "text-green-600 bg-green-50 px-2 py-1 rounded" : "text-red-600 bg-red-50 px-2 py-1 rounded"}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Unavailable'}
              </span>
            </div>
          </div>
          
          <button 
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-md ${
              product.stock > 0 
                ? 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg hover:-translate-y-1' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}
