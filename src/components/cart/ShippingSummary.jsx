const ShippingSummary = ({
  subtotal = 0,
  shipping = 0,
  tax = 0,
  discount = 0,
  freeShippingThreshold = 100,
  currency = '$',
  className = '',
}) => {
  const total = subtotal + shipping + tax - discount;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className={`space-y-4 ${className}`} role="region" aria-label="Order summary">
      <h3 className="font-semibold text-primary">Order Summary</h3>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-secondary">Subtotal</span>
          <span className="font-medium text-primary">{currency}{subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-success">
            <span>Discount</span>
            <span>-{currency}{discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-secondary">Shipping</span>
          <span className="font-medium text-primary">
            {shipping === 0 ? 'Free' : `${currency}${shipping.toFixed(2)}`}
          </span>
        </div>

        {tax > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-secondary">Estimated Tax</span>
            <span className="font-medium text-primary">{currency}{tax.toFixed(2)}</span>
          </div>
        )}

        {remainingForFreeShipping > 0 && (
          <div className="p-3 bg-warning-50 border border-warning-200 rounded-lg text-sm text-warning">
            <p>Add <strong>{currency}{remainingForFreeShipping.toFixed(2)}</strong> more for free shipping!</p>
          </div>
        )}

        <div className="border-t pt-3">
          <div className="flex justify-between text-base font-semibold text-primary">
            <span>Total</span>
            <span>{currency}{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingSummary;