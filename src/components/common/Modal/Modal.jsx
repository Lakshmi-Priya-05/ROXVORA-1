import { Fragment, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';


const Modal = ({ isOpen, onClose, title, children, size = 'md', showCloseButton = true, closeOnOverlayClick = true, closeOnEscape = true, className = '', overlayClassName = '', contentClassName = '', headerClassName = '', bodyClassName = '', footerClassName = '', footer }) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();

      const handleKeyDown = (event) => {
        if (event.key === 'Escape' && closeOnEscape) {
          onClose();
        }
        if (event.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements?.length) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            if (event.shiftKey && document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const modalContent = (
    <div
      ref={modalRef}
      className={`modal-content ${sizeClasses[size]} ${className} ${contentClassName}`}
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {(title || showCloseButton) && (
        <div className={`modal-header ${headerClassName}`}>
          {title && <h2 id="modal-title" className="text-xl font-semibold text-primary">{title}</h2>}
          {showCloseButton && (
            <button
              type="button"
              className="modal-close"
              onClick={onClose}
              aria-label="Close modal"
            >
              <FiX className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
      <div className={`modal-body ${bodyClassName}`}>
        {children}
      </div>
      {footer && (
        <div className={`modal-footer ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );

  return createPortal(
    <Fragment>
      <div
        className={`modal-overlay ${overlayClassName}`}
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />
      {modalContent}
    </Fragment>,
    document.body
  );
};

export default Modal;