import { Link } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '@store/slices/cartSlice';
import Price from '@components/common/Price/Price';

const CartItem = ({ item, className = '' }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart({ itemId: item.id, variantId: item.variantId }));
    } else {
      dispatch(updateQuantity({ itemId: item.id, variantId: item.variantId, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart({ itemId: item.id, variantId: item.variantId }));
  };

  const variantText = item.variant ? `${item.size || ''} ${item.color || ''}`.trim() : '';

  return (
    <div className={`flex gap-4 p-4 border-b border-neutral-100 ${className}`} data-item-id={`${item.id}-${item.variantId}`}>
      <Link to={`/product/${item.slug}`} className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden" aria-hidden="true">
        <img
          src={item.image || item.images?.[0] || '/images/placeholders/product.jpg'}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <Link to={`/product/${item.slug}`} className="block" onClick={(e) => e.stopPropagation()}>
          <h3 className="font-medium text-primary truncate">{item.name}</h3>
        </Link>

        {variantText && (
          <p className="text-sm text-secondary mt-1">{variantText}</p>
        )}

        <Price current={item.price} className="mt-2" />

        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden" role="group" aria-label="Quantity">
            <button
              type="button"
              className="btn btn-ghost btn-icon-sm p-2"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <FiMinus className="w-4 h-4" aria-hidden="true" />
            </button>
            <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
            <button
              type="button"
              className="btn btn-ghost btn-icon-sm p-2"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              aria-label="Increase quantity"
            >
              <FiPlus className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            className="btn btn-ghost btn-icon-sm text-error hover:text-error ml-auto"
            onClick={handleRemove}
            aria-label={`Remove ${item.name} from cart`}
          >
            <FiTrash2 className="w-5 h-5" aria-hidden="true" />
            <span className="sr-only">Remove</span>
          </button>
        </div>
      </div>

      <div className="flex-shrink-0 w-24 text-right">
        <Price current={item.price * item.quantity} className="font-semibold text-primary" />
      </div>
    </div>
  );
};

export default CartItem;