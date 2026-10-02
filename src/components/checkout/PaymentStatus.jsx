import { FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';

import { motion } from 'framer-motion';

const PaymentStatus = ({
  status = 'pending',
  orderId,
  amount,
  currency = '$',
  onRetry,
  onContinue,
  className = '',
}) => {
  const statusConfig = {
    pending: {
      icon: FiLoader,
      title: 'Processing Payment',
      description: 'Please wait while we process your payment...',
      color: 'text-warning',
      showRetry: false,
      showContinue: false,
    },
    success: {
      icon: FiCheckCircle,
      title: 'Payment Successful!',
      description: 'Your order has been confirmed.',
      color: 'text-success',
      showRetry: false,
      showContinue: true,
    },
    failed: {
      icon: FiAlertCircle,
      title: 'Payment Failed',
      description: 'There was an issue processing your payment. Please try again.',
      color: 'text-error',
      showRetry: true,
      showContinue: false,
    },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-center py-12 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${config.color} bg-current/10`}>
        <config.icon className="w-10 h-10" aria-hidden="true" />
      </div>

      <h2 className="text-2xl font-semibold text-primary mb-2">{config.title}</h2>
      <p className="text-secondary mb-8">{config.description}</p>

      {orderId && (
        <div className="mb-8 p-4 bg-neutral-50 rounded-lg">
          <p className="text-sm text-secondary">Order ID</p>
          <p className="font-mono font-medium text-primary">{orderId}</p>
        </div>
      )}

      {amount && (
        <div className="mb-8 p-4 bg-neutral-50 rounded-lg">
          <p className="text-sm text-secondary">Amount Paid</p>
          <p className="text-2xl font-bold text-primary">{currency}{amount.toFixed(2)}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {config.showRetry && (
          <button type="button" className="btn btn-primary" onClick={onRetry}>
            Try Again
          </button>
        )}
        {config.showContinue && (
          <button type="button" className="btn btn-primary" onClick={onContinue}>
            Continue Shopping
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default PaymentStatus;