import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import {
  FiCalendar,
  FiPackage,
  FiTruck,
  FiCreditCard,
  FiChevronRight,
  FiXCircle,
} from 'react-icons/fi';

import { cancelOrder } from '@store/slices/orderSlice';
import Price from '@components/common/Price/Price';

const OrderCard = ({
  order,
  onViewDetails,
  className = '',
}) => {
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleCancel = () => {
    dispatch(cancelOrder(order.id));
    toast.success(`Order #${order.orderNumber} cancelled`);
  };

  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-warning text-warning-dark' },
    confirmed: { label: 'Confirmed', color: 'bg-info text-info-dark' },
    processing: { label: 'Processing', color: 'bg-primary text-white' },
    shipped: { label: 'Shipped', color: 'bg-secondary text-white' },
    delivered: { label: 'Delivered', color: 'bg-success text-white' },
    cancelled: { label: 'Cancelled', color: 'bg-error text-white' },
    returned: { label: 'Returned', color: 'bg-neutral-500 text-white' },
  };

  const config = statusConfig[order.status] || statusConfig.pending;

  return (
    <article className={`card ${className}`}>
      <div className="p-4 lg:p-6 border-b border-neutral-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to={`/account/orders/${order.id}`} className="font-mono font-medium text-primary hover:text-secondary">
              #{order.orderNumber || order.id.slice(-8).toUpperCase()}
            </Link>
            <span className={`badge ${config.color}`}>{config.label}</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-secondary">
            <div className="flex items-center gap-1">
              <FiCalendar className="w-4 h-4" aria-hidden="true" />
              <span>{formatDate(order.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiPackage className="w-4 h-4" aria-hidden="true" />
              <span>{order.itemCount} item{order.itemCount !== 1 ? 's' : ''}</span>
            </div>
            <Price current={order.total} className="font-semibold text-primary" />
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-6">
        <div className="flex flex-wrap gap-4 mb-4">
          {order.items?.slice(0, 3).map((item) => (
            <Link key={item.id} to={`/product/${item.slug}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 transition-colors">
              {item.image ? (
                <img
                  src={item.image}
                  alt=""
                  className="w-12 h-12 rounded object-cover shrink-0"
                  loading="lazy"
                />
              ) : (
                <span
                  className="w-12 h-12 rounded bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-400"
                  aria-hidden="true"
                >
                  <FiPackage className="w-5 h-5" />
                </span>
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium text-primary truncate">{item.name}</p>
                <p className="text-xs text-secondary">Qty: {item.quantity}</p>
              </div>
            </Link>
          ))}
          {order.items && order.items.length > 3 && (
            <span className="flex items-center px-3 py-2 text-sm text-secondary bg-neutral-50 rounded-lg">
              +{order.items.length - 3} more
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-secondary">
            <div className="flex items-center gap-1">
              <FiTruck className="w-4 h-4" aria-hidden="true" />
              <span>{order.shippingMethod || 'Standard Shipping'}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiCreditCard className="w-4 h-4" aria-hidden="true" />
              <span>{order.paymentMethod || 'Credit Card'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {order.canCancel && (
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-ghost btn-sm text-secondary hover:text-error"
              >
                <FiXCircle className="w-4 h-4" aria-hidden="true" />
                Cancel Order
              </button>
            )}

            <Link
              to={`/account/orders/${order.id}`}
              onClick={onViewDetails}
              className="btn btn-outline btn-sm flex items-center gap-2"
            >
              View Details
              <FiChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default OrderCard;