import { Link } from 'react-router-dom';

const LowStockProducts = ({ products = [], className = '' }) => {
  return (
    <div className={`card ${className}`}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-primary">Low Stock Products</h3>
          <Link to="/admin/products" className="text-sm text-secondary hover:text-primary">View All</Link>
        </div>
      </div>
      <div className="divide-y">
        {products.map((product) => (
          <div key={product.id} className="p-4 flex items-center gap-4">
            <img src={product.image} alt="" className="w-12 h-12 rounded object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-primary truncate">{product.name}</p>
              <p className="text-sm text-secondary">{product.sku}</p>
            </div>
            <span className="badge badge-error badge-sm">{product.stock} left</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockProducts;