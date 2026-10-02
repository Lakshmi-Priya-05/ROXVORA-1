import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '@store/slices/productSlice';
import { formatCurrency } from '@utils/formatCurrency';
import StatsCard from './StatsCard';
import SalesChart from './SalesChart';
import RevenueChart from './RevenueChart';
import RecentOrders from './RecentOrders';
import LowStockProducts from './LowStockProducts';

const DashboardOverview = ({
  stats,
  recentOrders = [],
  lowStockProducts: lowStockProp,
  className = '',
}) => {
  const products = useSelector(selectProducts);

  const derived = useMemo(() => {
    const revenueByCategory = new Map();
    const unitsByCategory = new Map();
    let revenue = 0;
    let units = 0;

    products.forEach((product) => {
      const key = product.category || 'Uncategorised';
      const sold = product.salesCount || 0;
      const lineRevenue = (product.price || 0) * sold;

      revenue += lineRevenue;
      units += sold;
      revenueByCategory.set(key, (revenueByCategory.get(key) || 0) + lineRevenue);
      unitsByCategory.set(key, (unitsByCategory.get(key) || 0) + sold);
    });

    const lowStock = products.filter((p) => (p.stock ?? 0) > 0 && (p.stock ?? 0) <= 5);

    return {
      revenue,
      units,
      revenueData: Array.from(revenueByCategory, ([label, value]) => ({ label, value })).sort(
        (a, b) => b.value - a.value
      ),
      unitsData: Array.from(unitsByCategory, ([label, value]) => ({ label, value })).sort(
        (a, b) => b.value - a.value
      ),
      lowStock,
    };
  }, [products]);

  const resolvedStats = stats ?? {
    revenue: { value: formatCurrency(derived.revenue), change: null },
    orders: { value: String(derived.units), change: null },
    customers: { value: String(products.length), change: null },
    conversion: { value: '-', change: null },
  };

  const lowStockProducts = lowStockProp ?? derived.lowStock;

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={resolvedStats.revenue.value}
          change={resolvedStats.revenue.change}
          icon="revenue"
        />
        <StatsCard
          title="Units Sold"
          value={resolvedStats.orders.value}
          change={resolvedStats.orders.change}
          icon="orders"
        />
        <StatsCard
          title="Active Products"
          value={resolvedStats.customers.value}
          change={resolvedStats.customers.change}
          icon="users"
        />
        <StatsCard
          title="Conversion Rate"
          value={resolvedStats.conversion.value}
          change={resolvedStats.conversion.change}
          icon="conversion"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart data={derived.unitsData} />
        <RevenueChart data={derived.revenueData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders orders={recentOrders} />
        <LowStockProducts products={lowStockProducts} />
      </div>
    </div>
  );
};

export default DashboardOverview;
