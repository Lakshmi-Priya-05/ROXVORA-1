import { FiMapPin, FiPlus, FiCheck } from 'react-icons/fi';


const AddressSelector = ({
  addresses = [],
  selectedAddressId,
  onSelect,
  onAddNew,
  onEdit,
  onDelete,
  className = '',
  type = 'shipping',
}) => {
  const typeLabels = {
    shipping: 'Shipping Address',
    billing: 'Billing Address',
  };

  if (addresses.length === 0) {
    return (
      <div className={`border border-neutral-200 rounded-xl p-6 text-center ${className}`}>
        <FiMapPin className="w-12 h-12 text-neutral-300 mx-auto mb-4" aria-hidden="true" />
        <h3 className="font-medium text-primary mb-2">No saved addresses</h3>
        <p className="text-secondary mb-4">Add a new address to continue</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onAddNew}
        >
          <FiPlus className="w-4 h-4" aria-hidden="true" />
          Add Address
        </button>
      </div>
    );
  }

  return (
    <div className={`${className}`} role="radiogroup" aria-label={typeLabels[type]}>
      <h3 className="font-medium text-primary mb-4">{typeLabels[type]}</h3>
      <div className="space-y-3">
        {addresses.map((address) => (
          <label
            key={address.id}
            className={`relative flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
              selectedAddressId === address.id
                ? 'border-secondary bg-secondary-50'
                : 'border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <input
              type="radio"
              name={`${type}-address`}
              value={address.id}
              checked={selectedAddressId === address.id}
              onChange={() => onSelect?.(address.id)}
              className="sr-only"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-primary">{address.firstName} {address.lastName}</p>
                  {address.company && <p className="text-sm text-secondary">{address.company}</p>}
                  <p className="text-sm text-secondary mt-1">{address.address1}</p>
                  {address.address2 && <p className="text-sm text-secondary">{address.address2}</p>}
                  <p className="text-sm text-secondary">
                    {address.city}, {address.state} {address.postalCode}, {address.country}
                  </p>
                  <p className="text-sm text-secondary mt-1">{address.phone}</p>
                </div>
                {selectedAddressId === address.id && (
                  <FiCheck className="w-6 h-6 text-secondary flex-shrink-0" aria-hidden="true" />
                )}
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm text-xs"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit?.(address);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm text-xs text-error hover:text-error"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete?.(address.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </label>
        ))}
      </div>

      <button
        type="button"
        className="btn btn-outline w-full mt-4"
        onClick={onAddNew}
      >
        <FiPlus className="w-4 h-4" aria-hidden="true" />
        Add New Address
      </button>
    </div>
  );
};

export default AddressSelector;