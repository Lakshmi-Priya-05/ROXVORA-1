import { FiCreditCard, FiGlobe, FiSmartphone } from 'react-icons/fi';
import Button from '@components/common/Button/Button';

const PaymentMethod = ({
  methods = [
    {
      id: 'card',
      name: 'Credit / Debit Card',
      description: 'Visa, Mastercard, RuPay, American Express',
      icon: FiCreditCard,
    },
    {
      id: 'upi',
      name: 'UPI',
      description: 'GPay, PhonePe, Paytm and more',
      icon: FiSmartphone,
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      description: 'All major Indian banks',
      icon: FiGlobe,
    },
  ],
  selectedMethod = 'card',
  onSelect,
  onBack,
  onNext,
  isSubmitting = false,
  className = '',
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="space-y-3">
        {methods.map((method) => (
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
              name="payment-method"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => onSelect?.(method.id)}
              className="sr-only"
            />
            <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
              <method.icon className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-primary">{method.name}</h4>
              <p className="text-sm text-secondary mt-1">{method.description}</p>
            </div>
          </label>
        ))}
      </div>

      {selectedMethod === 'card' && (
        <div className="space-y-4 p-4 bg-neutral-50 rounded-xl" id="card-form">
          <h4 className="font-medium text-primary">Card Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-primary mb-1">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="input-field"
                maxLength={19}
                autoComplete="cc-number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="input-field"
                maxLength={5}
                autoComplete="cc-exp"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1">CVV</label>
              <input
                type="password"
                placeholder="123"
                className="input-field"
                maxLength={4}
                autoComplete="cc-csc"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Name on Card</label>
            <input
              type="text"
              placeholder="John Doe"
              className="input-field"
              autoComplete="cc-name"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button type="button" variant="secondary" size="lg" onClick={onBack} disabled={isSubmitting} className="w-full sm:w-auto">
          Back
        </Button>
        <Button type="button" variant="primary" size="lg" onClick={onNext} disabled={isSubmitting} className="w-full sm:flex-1">
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethod;