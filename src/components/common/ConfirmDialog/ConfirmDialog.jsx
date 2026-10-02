import { Fragment } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';


const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
  className = '',
}) => {
  if (!isOpen) return null;

  const content = (
    <Fragment>
      <div className="modal-overlay" onClick={onClose} aria-hidden="true" />
      <div className={`modal-content max-w-md ${className}`} role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <div className="modal-header">
          <h2 id="confirm-title" className="text-lg font-semibold text-primary">{title}</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close dialog"
            disabled={loading}
          >
            <FiX className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        <div className="modal-body">
          <p className="text-secondary">{message}</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline btn-md"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`btn btn-${variant} btn-md`}
            onClick={onConfirm}
            disabled={loading}
            autoFocus
          >
            {loading ? (
              <>
                <span className="loader loader-sm loader-white" aria-hidden="true" />
                <span className="visually-hidden">Processing...</span>
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </Fragment>
  );

  return createPortal(content, document.body);
};

export default ConfirmDialog;