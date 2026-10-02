const Loader = ({ size = 'md', color = 'primary', className = '', 'aria-label': ariaLabel = 'Loading' }) => {
  const sizeClasses = {
    xs: 'loader-xs',
    sm: 'loader-sm',
    md: 'loader-md',
    lg: 'loader-lg',
    xl: 'loader-xl',
  };

  const colorClasses = {
    primary: '',
    secondary: 'loader-secondary',
    white: 'loader-white',
  };

  const classes = ['loader', sizeClasses[size], colorClasses[color], className].filter(Boolean).join(' ');

  return (
    <span
      className={classes}
      role="status"
      aria-label={ariaLabel}
      aria-busy="true"
    >
      <span className="visually-hidden">{ariaLabel}</span>
    </span>
  );
};

export default Loader;