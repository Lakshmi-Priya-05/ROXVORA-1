const formatAmount = (value) => {
  if (value === null || value === undefined || value === '') return '';

  const num = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]/g, '')) : value;
  if (typeof num !== 'number' || Number.isNaN(num)) return '';

  return num.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

const Price = ({
  current,
  original,
  currency = '₹',
  className = '',
  currentClassName = '',
  originalClassName = '',
  currencyClassName = '',
  showCurrency = true,
}) => {
  const formattedCurrent = formatAmount(current);
  const formattedOriginal = formatAmount(original);

  const numCurrent = parseFloat(current);
  const numOriginal = parseFloat(original);
  const hasDiscount = Number.isFinite(numOriginal) && Number.isFinite(numCurrent) && numOriginal > numCurrent;
  const discountPercent = hasDiscount ? Math.round(((original - current) / original) * 100) : 0;

  return (
    <div className={`flex items-baseline gap-2 ${className}`} aria-label={`Price: ${formattedCurrent} ${currency}`}>
      <span className={`font-semibold text-primary ${currentClassName}`}>
        {showCurrency && <span className={currencyClassName}>{currency}</span>}
        {formattedCurrent}
      </span>
      {hasDiscount && (
        <>
          <span className={`text-secondary line-through ${originalClassName}`}>
            {showCurrency && <span className={currencyClassName}>{currency}</span>}
            {formattedOriginal}
          </span>
          <span className="badge badge-success badge-sm" aria-label={`${discountPercent}% off`}>
            -{discountPercent}%
          </span>
        </>
      )}
      {original && !hasDiscount && (
        <span className={`text-secondary line-through ${originalClassName}`}>
          {showCurrency && <span className={currencyClassName}>{currency}</span>}
          {formattedOriginal}
        </span>
      )}
    </div>
  );
};

export default Price;