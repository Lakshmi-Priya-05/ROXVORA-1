const EmptyState = ({
  icon,
  title = 'Nothing here',
  description = 'Looks like there\'s nothing to see.',
  action,
  className = '',
  iconClassName = '',
  titleClassName = '',
  descriptionClassName = '',
  actionClassName = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-12 px-4 ${className}`} role="status" aria-live="polite">
      {icon && (
        <div className={`mb-4 text-neutral-300 ${iconClassName}`} aria-hidden="true">
          {typeof icon === 'string' ? icon : icon}
        </div>
      )}
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

export default EmptyState;