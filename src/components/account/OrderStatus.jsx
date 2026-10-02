import { FiCheckCircle, FiTruck, FiPackage } from 'react-icons/fi';


const OrderStatus = ({
  status,
  timeline = [],
  className = '',
}) => {
  const statusOrder = [
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
  ];

  const statusLabels = {
    pending: 'Order Placed',
    confirmed: 'Confirmed',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
  };

  const statusIcons = {
    pending: FiPackage,
    confirmed: FiCheckCircle,
    processing: FiPackage,
    shipped: FiTruck,
    delivered: FiCheckCircle,
  };

  const currentIndex = statusOrder.indexOf(status);
  const completedStatuses = statusOrder.slice(0, currentIndex + 1);

  return (
    <div className={`${className}`} role="region" aria-label="Order status timeline">
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-neutral-200" aria-hidden="true" />

        <div className="space-y-6">
          {statusOrder.map((stepStatus, index) => {
            const isCompleted = completedStatuses.includes(stepStatus);
            const isCurrent = stepStatus === status;
            const stepTimeline = timeline.find((t) => t.status === stepStatus);
            const Icon = statusIcons[stepStatus];

            return (
              <div key={stepStatus} className="relative flex gap-4">
                <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted
                      ? 'bg-secondary border-secondary text-white'
                      : isCurrent
                      ? 'bg-white border-secondary ring-4 ring-secondary/20'
                      : 'bg-white border-neutral-200'
                  }`}>
                    <Icon className={`w-5 h-5 ${isCompleted ? '' : isCurrent ? 'text-secondary' : 'text-neutral-300'}`} aria-hidden="true" />
                  </div>
                </div>

                <div className={`flex-1 pt-1 ${index === statusOrder.length - 1 ? 'pb-0' : ''}`}>
                  <h4 className={`font-medium text-sm ${isCompleted || isCurrent ? 'text-primary' : 'text-neutral-500'}`}>
                    {statusLabels[stepStatus]}
                  </h4>
                  <p className="text-sm text-secondary mt-1">
                    {stepTimeline?.date
                      ? new Date(stepTimeline.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                      : isCompleted
                      ? 'Completed'
                      : isCurrent
                      ? 'In progress'
                      : 'Pending'}
                  </p>
                  {stepTimeline?.description && (
                    <p className="text-xs text-neutral-400 mt-1">{stepTimeline.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;