import { FiTruck, FiClock } from 'react-icons/fi';
import { appConfig } from '@config/appConfig';
import { formatCurrency } from '@utils/formatCurrency';
import Button from '@components/common/Button/Button';

const DeliveryInformation = ({
  shippingMethods = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: '3-5 business days',
      price: appConfig.cart.defaultShipping,
      estimatedDays: '3-5',
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: '1-2 business days',
      price: appConfig.cart.expressShipping,
      estimatedDays: '1-2',
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      description: 'Next business day',
      price: appConfig.cart.overnightShipping,
      estimatedDays: '1',
    },
  ],
  selectedMethod = 'standard',
  onSelect,
  onBack,
  onNext,
  isSubmitting = false,
  className = '',
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="space-y-3">
        {shippingMethods.map((method) => (
          <label
            key={method.id}
            className={`relative flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
              selectedMethod === method.id
                ? 'border-secondary bg-secondary-50'
                : 'border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <input
              type="radio"
              name="shipping-method"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => onSelect?.(method.id)}
              className="sr-only"
            />
            <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
              <FiTruck className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-primary">{method.name}</h4>
                <span className="font-semibold text-primary">{formatCurrency(method.price)}</span>
              </div>
              <p className="text-sm text-secondary mt-1">{method.description}</p>
            </div>
            <div className="text-right">
              <FiClock className="w-5 h-5 text-secondary mx-auto" aria-hidden="true" />
              <p className="text-xs text-secondary mt-1">{method.estimatedDays} days</p>
            </div>
          </label>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button type="button" variant="secondary" size="lg" onClick={onBack} disabled={isSubmitting} className="w-full sm:w-auto">
          Back
        </Button>
        <Button type="button" variant="primary" size="lg" onClick={onNext} disabled={isSubmitting} className="w-full sm:flex-1">
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default DeliveryInformation;