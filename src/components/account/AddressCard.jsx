import { FiEdit, FiTrash2, FiCheck } from 'react-icons/fi';


const AddressCard = ({
  address,
  isDefault = false,
  onEdit,
  onDelete,
  onSetDefault,
  className = '',
  variant = 'default',
}) => {
  const variants = {
    default: 'border border-neutral-200 rounded-xl p-6',
    compact: 'border border-neutral-200 rounded-lg p-4',
    selector: 'border-2 rounded-xl p-4 cursor-pointer transition-all',
  };

  return (
    <div className={`${variants[variant]} ${className} ${isDefault && variant === 'selector' ? 'border-secondary bg-secondary-50' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-medium text-primary">{address.firstName} {address.lastName}</h4>
            {isDefault && (
              <span className="badge badge-primary badge-xs">Default</span>
            )}
          </div>
          {address.company && <p className="text-sm text-secondary mb-1">{address.company}</p>}
          <p className="text-sm text-secondary mb-1">{address.address1}</p>
          {address.address2 && <p className="text-sm text-secondary mb-1">{address.address2}</p>}
          <p className="text-sm text-secondary mb-1">
            {address.city}, {address.state} {address.postalCode}, {address.country}
          </p>
          <p className="text-sm text-secondary">{address.phone}</p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {variant === 'selector' && !isDefault && (
            <button
              type="button"
              className="btn btn-ghost btn-sm text-xs"
              onClick={() => onSetDefault?.(address.id)}
            >
              <FiCheck className="w-4 h-4" aria-hidden="true" />
              Set Default
            </button>
          )}

          {onEdit && (
            <button
              type="button"
              className="btn btn-ghost btn-icon-sm"
              onClick={() => onEdit(address)}
              aria-label="Edit address"
            >
              <FiEdit className="w-5 h-5" aria-hidden="true" />
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              className="btn btn-ghost btn-icon-sm text-error hover:text-error"
              onClick={() => onDelete(address.id)}
              aria-label="Delete address"
            >
              <FiTrash2 className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressCard;