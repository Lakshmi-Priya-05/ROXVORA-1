import { forwardRef, useId } from 'react';

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className = '',
      inputClassName = '',
      wrapperClassName = '',
      id: providedId,
      disabled = false,
      required = false,
      readOnly = false,
      size = 'md',
      fullWidth = true,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const describedBy = [error && errorId, helperText && helperId].filter(Boolean).join(' ') || undefined;

    const wrapperClasses = ['input-wrapper', fullWidth ? 'w-full' : '', wrapperClassName].filter(Boolean).join(' ');
    const inputClasses = [
      'input-field',
      `input-field-${size}`,
      error ? 'input-error-state' : '',
      leftIcon && 'input-with-icon-left',
      rightIcon && 'input-with-icon-right',
      className,
      inputClassName,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses} style={{ width: fullWidth ? '100%' : 'auto' }}>
        {label && (
          <label htmlFor={id} className="input-label">
            {label}
            {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="input-icon input-icon-left" aria-hidden="true">
              {typeof leftIcon === 'string' ? leftIcon : leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={inputClasses}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            aria-required={required}
            {...props}
          />
          {rightIcon && (
            <span className="input-icon input-icon-right" aria-hidden="true">
              {typeof rightIcon === 'string' ? rightIcon : rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p id={errorId} className="input-error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="input-helper">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;