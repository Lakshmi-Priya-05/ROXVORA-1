import { useState } from 'react';
import { FiTag, FiCheck, FiX } from 'react-icons/fi';

const CouponInput = ({
  value = '',
  onApply,
  isApplying = false,
  appliedCoupon = null,
  onRemove,
  className = '',
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleApply = async (e) => {
    e.preventDefault();
    if (!localValue.trim() && !appliedCoupon) return;

    setStatus('loading');
    setError('');

    try {
      await onApply?.(localValue.trim());
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Invalid coupon code');
    }
  };

  const handleRemove = () => {
    onRemove?.();
    setLocalValue('');
    setStatus('idle');
  };

  return (
    <div className={className}>
      {appliedCoupon ? (
        <div className="flex items-center justify-between p-4 bg-success-50 border border-success-200 rounded-lg">
          <div className="flex items-center gap-3">
            <FiTag className="w-5 h-5 text-success" aria-hidden="true" />
            <div>
              <p className="font-medium text-success">Coupon Applied</p>
              <p className="text-sm text-success/80">
                {appliedCoupon.code}
                {appliedCoupon.label ? ` - ${appliedCoupon.label}` : ''}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-icon-sm text-success hover:text-success"
            onClick={handleRemove}
            aria-label="Remove coupon"
          >
            <FiX className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="flex gap-2" noValidate>
          <label htmlFor="coupon-code" className="visually-hidden">Coupon code</label>
          <input
            id="coupon-code"
            type="text"
            value={localValue}
            onChange={(e) => {
              setLocalValue(e.target.value.toUpperCase());
              if (status === 'error') setStatus('idle');
            }}
            placeholder="Coupon code"
            className="flex-1 input-field"
            disabled={isApplying || status === 'loading'}
            aria-describedby={status === 'error' ? 'coupon-error' : undefined}
            aria-invalid={status === 'error'}
            autoComplete="off"
          />
          <button
            type="submit"
            className="btn btn-secondary whitespace-nowrap"
            disabled={isApplying || status === 'loading' || !localValue.trim()}
          >
            {status === 'loading' ? (
              <>
                <span className="loader loader-sm loader-white" aria-hidden="true" />
                <span className="visually-hidden">Applying...</span>
              </>
            ) : status === 'success' ? (
              <>
                <FiCheck className="w-5 h-5" aria-hidden="true" />
                Applied!
              </>
            ) : (
              'Apply'
            )}
          </button>
        </form>
      )}

      {error && (
        <p id="coupon-error" className="text-error text-sm mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default CouponInput;