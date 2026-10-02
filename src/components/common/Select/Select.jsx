import { forwardRef, useId } from 'react';

const Select = forwardRef(
  (
    {
      label,
      error,
      helperText,
      options = [],
      placeholder = 'Select an option',
      className = '',
      selectClassName = '',
      wrapperClassName = '',
      id: providedId,
      disabled = false,
      required = false,
      size = 'md',
      fullWidth = true,
      multiple = false,
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

    const selectClasses = ['select-field', `select-field-${size}`, className, selectClassName]
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
          <select
            ref={ref}
            id={id}
            className={selectClasses}
            disabled={disabled}
            required={required}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            aria-required={required}
            multiple={multiple}
            {...props}
          >
            {placeholder && !multiple && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" aria-hidden="true">
            <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
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

Select.displayName = 'Select';

export default Select;