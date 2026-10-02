const Skeleton = ({ variant = 'rectangular', className = '', width, height, animation = 'shimmer' }) => {
  const variantClasses = {
    text: 'skeleton-text',
    circular: 'skeleton-circular',
    rectangular: 'skeleton-rectangular',
    rounded: 'skeleton-rounded',
  };

  const animationClasses = {
    shimmer: 'skeleton-shimmer',
    pulse: 'skeleton-pulse',
    none: '',
  };

  const classes = ['skeleton', variantClasses[variant], animationClasses[animation] ?? '', className]
    .filter(Boolean)
    .join(' ');

  const style = {
    width: width || (variant === 'circular' ? height : '100%'),
    height: height || (variant === 'text' ? '1rem' : variant === 'circular' ? width : '1rem'),
  };

  return (
    <div
      className={classes}
      style={style}
      aria-hidden="true"
      data-testid="skeleton"
    />
  );
};

const SkeletonText = ({ lines = 3, className = '', lineHeight = '1rem', gap = '0.5rem' }) => {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap }} aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} variant="text" height={lineHeight} width={i === lines - 1 ? '60%' : '100%' } />
      ))}
    </div>
  );
};

const SkeletonCard = ({ className = '', imageAspectRatio = '1/1' }) => {
  return (
    <div className={`card ${className}`} aria-hidden="true">
      <div className="relative overflow-hidden" style={{ aspectRatio: imageAspectRatio }}>
        <Skeleton variant="rectangular" className="absolute inset-0" />
      </div>
      <div className="card-body space-y-3">
        <SkeletonText lines={1} />
        <SkeletonText lines={2} />
        <div className="flex items-center gap-2">
          <Skeleton variant="circular" width="24px" height="24px" />
          <Skeleton variant="text" width="80px" />
        </div>
      </div>
    </div>
  );
};

const SkeletonProductCard = ({ className = '' }) => {
  return (
    <div className={`card ${className}`} aria-hidden="true">
      <div className="relative overflow-hidden aspect-square">
        <Skeleton variant="rectangular" className="absolute inset-0" />
        <div className="absolute top-3 left-3 flex gap-1">
          <Skeleton variant="rounded" width="40px" height="20px" />
          <Skeleton variant="rounded" width="40px" height="20px" />
        </div>
      </div>
      <div className="card-body space-y-2">
        <SkeletonText lines={1} />
        <SkeletonText lines={1} />
        <div className="flex items-center justify-between">
          <Skeleton variant="text" width="80px" height="1.25rem" />
          <Skeleton variant="rounded" width="40px" height="20px" />
        </div>
      </div>
    </div>
  );
};

export { Skeleton, SkeletonText, SkeletonCard, SkeletonProductCard };