const Rating = ({
  value = 0,
  max = 5,
  size = 'md',
  readonly = true,
  showLabel = false,
  className = '',
  onChange,
  'aria-label': ariaLabel = 'Rating',
}) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  const iconSize = sizes[size] || sizes.md;

  const stars = Array.from({ length: max }, (_, i) => {
    const starValue = i + 1;
    const filled = starValue <= value;
    const partial = !filled && starValue - 0.5 <= value;

    return (
      <button
        key={i}
        type="button"
        className={`flex items-center justify-center ${readonly ? 'pointer-events-none' : 'hover:scale-110 transition-transform'}`}
        onClick={() => !readonly && onChange?.(starValue)}
        onKeyDown={(e) => {
          if (!readonly && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onChange?.(starValue);
          }
        }}
        aria-label={`${starValue} out of ${max} stars`}
        aria-pressed={filled}
        disabled={readonly}
        tabIndex={readonly ? -1 : 0}
      >
        <svg className={iconSize} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        {partial && (
          <svg className={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ position: 'absolute', clipPath: 'inset(0 50% 0 0)' }}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        )}
      </button>
    );
  });

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role={readonly ? 'img' : 'radiogroup'}
      aria-label={ariaLabel}
      aria-readonly={readonly}
    >
      <div className="flex items-center gap-0.5" style={{ color: '#f59e0b' }}>
        {stars}
      </div>
      {showLabel && (
        <span className="text-sm text-secondary ml-2">
          {value.toFixed(1)} / {max}
        </span>
      )}
    </div>
  );
};

export default Rating;