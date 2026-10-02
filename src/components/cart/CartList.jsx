import CartItem from './CartItem';
import EmptyCart from './EmptyCart';

const CartList = ({
  items = [],
  className = '',
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`} aria-busy="true" aria-label="Loading cart">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex gap-4 p-4 border-b border-neutral-100 animate-pulse">
            <div className="w-20 h-20 rounded-lg skeleton" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-3/4 skeleton skeleton-text" />
              <div className="h-4 w-1/2 skeleton skeleton-text" />
              <div className="h-6 w-24 skeleton skeleton-rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className={`space-y-0 ${className}`} role="list" aria-label="Cart items">
      {items.map((item) => (
        <CartItem key={`${item.id}-${item.variantId}`} item={item} />
      ))}
    </div>
  );
};

export default CartList;