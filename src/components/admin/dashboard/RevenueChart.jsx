import BarChart from './BarChart';
import { formatCurrency } from '@utils/formatCurrency';

const RevenueChart = ({ data = [], className = '' }) => {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <section className={`card p-6 ${className}`} aria-labelledby="revenue-chart-heading">
      <div className="flex items-baseline justify-between mb-4">
        <h3 id="revenue-chart-heading" className="font-semibold text-primary">
          Revenue by Category
        </h3>
        {total > 0 && (
          <span className="text-xs text-secondary">{formatCurrency(total)} total</span>
        )}
      </div>
      <BarChart
        data={data}
        formatValue={formatCurrency}
        ariaLabel="Revenue by category"
        emptyMessage="No revenue recorded yet."
      />
    </section>
  );
};

export default RevenueChart;
