import { FiEdit, FiTrash2, FiEye, FiPackage } from 'react-icons/fi';

import Badge from '@components/product/ProductBadge';
import Price from '@components/common/Price/Price';

const ProductTable = ({
  products = [],
  onEdit,
  onDelete,
  onView,
  isLoading = false,
  className = '',
}) => {
  const columns = [
    { key: 'image', label: '' },
    { key: 'name', label: 'Product' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price' },
    { key: 'stock', label: 'Stock' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  if (isLoading) {
    return (
      <div className={`card ${className}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-secondary border-b">
                {columns.map((col) => (
                  <th key={col.key} className="pb-3 font-medium">{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b last:border-0 animate-pulse">
                  <td className="py-4"><div className="w-12 h-12 skeleton skeleton-rectangular" /></td>
                  <td className="py-4"><div className="h-4 w-3/4 skeleton skeleton-text" /></td>
                  <td className="py-4"><div className="h-4 w-1/2 skeleton skeleton-text" /></td>
                  <td className="py-4"><div className="h-4 w-20 skeleton skeleton-rounded" /></td>
                  <td className="py-4"><div className="h-4 w-16 skeleton skeleton-rounded" /></td>
                  <td className="py-4"><div className="h-4 w-20 skeleton skeleton-rounded" /></td>
                  <td className="py-4"><div className="h-4 w-24 skeleton skeleton-rounded" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={`card ${className}`}>
        <div className="p-12 text-center">
          <FiPackage className="text-neutral-300 text-4xl mb-3" aria-hidden="true" />
          <h3 className="text-lg font-medium text-primary mb-1">No products found</h3>
          <p className="text-secondary">Get started by adding your first product</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`card ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-secondary border-b">
              {columns.map((col) => (
                <th key={col.key} className="pb-3 font-medium">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-neutral-50">
                <td className="py-4">
                  <img
                    src={product.images?.[0] || '/images/placeholders/product.jpg'}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </td>
                <td className="py-4">
                  <div>
                    <p className="font-medium text-primary">{product.name}</p>
                    <p className="text-sm text-secondary font-mono">{product.sku}</p>
                  </div>
                </td>
                <td className="py-4 text-secondary">{product.category}</td>
                <td className="py-4">
                  <Price current={product.price} original={product.originalPrice} />
                </td>
                <td className="py-4">
                  {product.stock <= 5 ? (
                    <span className="text-warning font-medium">{product.stock} left</span>
                  ) : (
                    <span className="text-success font-medium">{product.stock}</span>
                  )}
                </td>
                <td className="py-4">
                  <Badge
                    variant={product.isActive ? 'success' : 'default'}
                    size="sm"
                  >
                    {product.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="btn btn-ghost btn-icon-sm"
                      onClick={() => onView?.(product)}
                      aria-label="View product"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost btn-icon-sm"
                      onClick={() => onEdit?.(product)}
                      aria-label="Edit product"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost btn-icon-sm text-error hover:text-error"
                      onClick={() => onDelete?.(product.id)}
                      aria-label="Delete product"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;