import { forwardRef } from 'react';

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      disabled = false,
      loading = false,
      leftIcon,
      rightIcon,
      className = '',
      type = 'button',
      onClick,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'btn';
    const variantClasses = `btn-${variant}`;
    const sizeClasses = `btn-${size}`;
    const widthClasses = fullWidth ? 'btn-full' : '';
    const disabledClasses = disabled || loading ? 'btn-disabled' : '';
    const loadingClasses = loading ? 'btn-loading' : '';

    const classNames = [
      baseClasses,
      variantClasses,
      sizeClasses,
      widthClasses,
      disabledClasses,
      loadingClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type={type}
        className={classNames}
        disabled={disabled || loading}
        onClick={onClick}
        aria-busy={loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="btn-loader">
            <span className="loader loader-sm loader-white" aria-hidden="true" />
            <span className="visually-hidden">Loading...</span>
          </span>
        ) : (
          <>
            {leftIcon && <span className="btn-icon-left" aria-hidden="true">{leftIcon}</span>}
            <span className="btn-content">{children}</span>
            {rightIcon && <span className="btn-icon-right" aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;