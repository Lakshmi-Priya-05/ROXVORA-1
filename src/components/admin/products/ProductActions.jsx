import { FiEdit, FiTrash2, FiEye, FiCheckCircle, FiXCircle } from 'react-icons/fi';


const ProductActions = ({
  product,
  onEdit,
  onDelete,
  onView,
  onToggleStatus,
  onDuplicate,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`} role="group" aria-label="Product actions">
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
        className="btn btn-ghost btn-icon-sm"
        onClick={() => onDuplicate?.(product)}
        aria-label="Duplicate product"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
      <button
        type="button"
        className={`btn btn-ghost btn-icon-sm ${product.isActive ? 'text-success' : 'text-error'}`}
        onClick={() => onToggleStatus?.(product)}
        aria-label={product.isActive ? 'Deactivate product' : 'Activate product'}
        aria-pressed={product.isActive}
      >
        {product.isActive ? <FiCheckCircle className="w-4 h-4" /> : <FiXCircle className="w-4 h-4" />}
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
  );
};

export default ProductActions;