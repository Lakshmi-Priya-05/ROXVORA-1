import { formatCurrency } from '@utils/formatCurrency';

const PLACEHOLDER =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" fill="#f2f2f3"/><g fill="none" stroke="#d6d6d9" stroke-width="3"><circle cx="48" cy="40" r="14"/><path d="M24 76c0-14 11-22 24-22s24 8 24 22"/></g></svg>'
  );

const OrderSummary = ({
  items = [],
  subtotal = 0,
  shipping = 0,
  tax = 0,
  discount = 0,
  total = 0,
  className = '',
}) => {
  return (
    <aside className={`sticky top-24 md:top-32 ${className}`} aria-label="Order summary">
      <div className="card p-6">
        <h3 className="font-semibold text-primary mb-4">Order Summary</h3>

        <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
          {items.map((item) => {
            const image = item.image || item.images?.[0] || PLACEHOLDER;
            return (
              <div key={`${item.id}-${item.variantId ?? ''}-${item.size ?? ''}`} className="flex gap-3">
                <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100">
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary truncate">{item.name}</p>
                  <p className="text-xs text-secondary">
                    {item.quantity} × {formatCurrency(item.price)}
                  </p>
                  {item.size && (
                    <p className="text-xs text-secondary">Size: {item.size}</p>
                  )}
                </div>
                <span className="text-sm font-medium text-primary">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-secondary">Subtotal</span>
            <span className="font-medium text-primary">{formatCurrency(subtotal)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm text-success">
              <span>Discount</span>
              <span>-{formatCurrency(discount)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-secondary">Shipping</span>
            <span className="font-medium text-primary">
              {shipping === 0 ? 'Free' : formatCurrency(shipping)}
            </span>
          </div>

          {tax > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-secondary">Tax</span>
              <span className="font-medium text-primary">{formatCurrency(tax)}</span>
            </div>
          )}

          <div className="border-t pt-3">
            <div className="flex justify-between text-base font-semibold text-primary">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default OrderSummary;