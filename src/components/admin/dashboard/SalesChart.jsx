import BarChart from './BarChart';

const SalesChart = ({ data = [], className = '' }) => {
  return (
    <section className={`card p-6 ${className}`} aria-labelledby="sales-chart-heading">
      <div className="flex items-baseline justify-between mb-4">
        <h3 id="sales-chart-heading" className="font-semibold text-primary">
          Sales Overview
        </h3>
        <span className="text-xs text-secondary">Units sold</span>
      </div>
      <BarChart
        data={data}
        formatValue={(v) => `${v} units`}
        ariaLabel="Units sold per label"
        emptyMessage="No sales recorded yet."
      />
    </section>
  );
};

export default SalesChart;
