import { FiUsers, FiShoppingBag, FiDollarSign, FiTrendingUp, FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';

const StatsCard = ({
  title,
  value,
  change,
  changeType = 'increase',
  icon,
  className = '',
}) => {
  const icons = {
    users: FiUsers,
    orders: FiShoppingBag,
    revenue: FiDollarSign,
    conversion: FiTrendingUp,
  };

  const Icon = icons[icon] || FiDollarSign;

  return (
    <div className={`card p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-secondary">{title}</p>
          <p className="text-3xl font-bold text-primary mt-1">{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={`text-sm font-medium ${changeType === 'increase' ? 'text-success' : 'text-error'}`}
              >
                {changeType === 'increase' ? (
                  <FiArrowUpRight className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <FiArrowDownRight className="w-4 h-4" aria-hidden="true" />
                )}
                {change}
              </span>
              <span className="text-sm text-secondary">vs last month</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;