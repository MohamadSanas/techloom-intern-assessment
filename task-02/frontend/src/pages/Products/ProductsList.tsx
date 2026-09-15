import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { productApi } from '../../services/api';

export default function ProductsList() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getProducts(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) return <div className="text-red-500 p-4 bg-red-50 rounded-lg">Error loading products.</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Our Collection</h1>
          <p className="text-slate-500 mt-2">Discover our premium range of products</p>
        </div>
        
        {/* Simple Filters Placeholder */}
        <div className="flex gap-2">
          <input type="text" placeholder="Search..." className="px-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
          <button className="px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">Search</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`} className="group block">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-square bg-slate-100 flex items-center justify-center p-6 relative">
                 <div className="text-6xl group-hover:scale-110 transition-transform duration-300">🛍️</div>
                 {product.stock <= 0 && (
                   <span className="absolute top-4 right-4 bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">Out of Stock</span>
                 )}
              </div>
              <div className="p-5">
                <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">{product.category}</div>
                <h3 className="font-semibold text-lg text-slate-900 truncate">{product.name}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 mt-1">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
                  <span className="text-sm font-medium text-blue-600 group-hover:underline">View Details</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
