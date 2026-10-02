import { Link } from 'react-router-dom';

const RecentOrders = ({ orders = [], className = '' }) => {
  return (
    <div className={`card ${className}`}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-primary">Recent Orders</h3>
          <Link to="/admin/orders" className="text-sm text-secondary hover:text-primary">View All</Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-secondary border-b">
              <th className="pb-3 font-medium">Order</th>
              <th className="pb-3 font-medium">Customer</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b last:border-0">
                <td className="py-4 font-mono font-medium text-primary">#{order.id}</td>
                <td className="py-4">{order.customerName}</td>
                <td className="py-4 text-secondary">{new Date(order.date).toLocaleDateString()}</td>
                <td className="py-4">
                  <span className="badge badge-primary badge-sm">{order.status}</span>
                </td>
                <td className="py-4 text-right font-medium text-primary">${order.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;