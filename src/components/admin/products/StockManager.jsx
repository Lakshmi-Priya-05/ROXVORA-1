import Input from '@components/common/Input/Input';
import Select from '@components/common/Select/Select';
import Button from '@components/common/Button/Button';

const StockManager = ({
  product,
  onStockUpdate,
  className = '',
}) => {
  return (
    <div className={`card p-6 ${className}`}>
      <h3 className="font-semibold text-primary mb-4">Stock Management</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center p-4 bg-neutral-50 rounded-lg">
          <p className="text-3xl font-bold text-primary">{product.stock}</p>
          <p className="text-sm text-secondary">Current Stock</p>
        </div>
        <div className="text-center p-4 bg-neutral-50 rounded-lg">
          <p className="text-3xl font-bold text-secondary">{product.reserved || 0}</p>
          <p className="text-sm text-secondary">Reserved</p>
        </div>
        <div className="text-center p-4 bg-neutral-50 rounded-lg">
          <p className="text-3xl font-bold text-success">{product.available || product.stock}</p>
          <p className="text-sm text-secondary">Available</p>
        </div>
      </div>

      <div className="border-t pt-6">
        <h4 className="font-medium text-primary mb-4">Adjust Stock</h4>
        <div className="flex items-center gap-4">
          <Input
            type="number"
            placeholder="Quantity"
            className="w-32"
            min="-999"
            max="999"
          />
          <Select
            options={[
              { value: 'add', label: 'Add Stock' },
              { value: 'remove', label: 'Remove Stock' },
              { value: 'set', label: 'Set Stock' },
            ]}
            placeholder="Action"
            className="w-40"
          />
          <Button variant="primary" onClick={onStockUpdate}>
            Update
          </Button>
        </div>
      </div>

      <div className="mt-6 border-t pt-6">
        <h4 className="font-medium text-primary mb-4">Low Stock Alerts</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 text-secondary border-neutral-300 rounded focus:ring-secondary focus:ring-2" />
            <span className="text-sm text-secondary">Enable low stock notifications</span>
          </label>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              placeholder="Threshold"
              className="w-32"
              min="1"
              defaultValue="5"
            />
            <span className="text-sm text-secondary">Notify when stock falls below this level</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockManager;