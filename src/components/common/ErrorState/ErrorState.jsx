const ErrorState = ({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  action,
  className = '',
  iconClassName = '',
  titleClassName = '',
  descriptionClassName = '',
  actionClassName = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-12 px-4 ${className}`} role="alert">
      <div className={`mb-4 text-error ${iconClassName}`} aria-hidden="true">
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className={`text-lg font-medium text-primary mb-2 ${titleClassName}`}>{title}</h3>
      <p className={`text-secondary max-w-sm mb-6 ${descriptionClassName}`}>{description}</p>
      {action && (
        <div className={actionClassName}>
          {action}
        </div>
      )}
    </div>
  );
};

export default ErrorState;