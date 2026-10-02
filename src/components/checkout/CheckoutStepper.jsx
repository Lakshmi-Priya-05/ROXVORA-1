import { FiCheck } from 'react-icons/fi';

import { motion } from 'framer-motion';

const CheckoutStepper = ({
  steps = [
    { id: 'information', label: 'Information', href: '/checkout' },
    { id: 'shipping', label: 'Shipping', href: '/checkout/shipping' },
    { id: 'payment', label: 'Payment', href: '/checkout/payment' },
  ],
  currentStep = 0,
  className = '',
}) => {
  return (
    <nav className={`${className}`} aria-label="Checkout progress">
      <ol className="flex items-center" role="list">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <li key={step.id} className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                className={`relative flex items-center z-10`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    isCompleted
                      ? 'bg-secondary text-white'
                      : isActive
                      ? 'bg-secondary text-white ring-4 ring-secondary/20'
                      : 'bg-neutral-100 text-neutral-400'
                  }`}
                >
                  {isCompleted ? (
                    <FiCheck className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <span aria-hidden="true">{index + 1}</span>
                  )}
                </div>

                <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-10 text-center text-xs font-medium ${
                  isCompleted || isActive ? 'text-primary' : 'text-neutral-400'
                }`}>
                  {step.label}
                </span>
              </motion.div>

              {!isLast && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                  className={`h-1 mx-4 rounded-full flex-1 max-w-32 ${
                    isCompleted ? 'bg-secondary' : 'bg-neutral-100'
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default CheckoutStepper;