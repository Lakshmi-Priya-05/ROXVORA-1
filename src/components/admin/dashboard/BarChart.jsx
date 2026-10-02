const BarChart = ({
  data = [],
  height = 220,
  formatValue = (v) => v,
  emptyMessage = 'No data available yet.',
  ariaLabel = 'Bar chart',
}) => {
  if (!data.length) {
    return (
      <div
        className="h-full flex items-center justify-center text-sm text-secondary"
        style={{ height }}
      >
        {emptyMessage}
      </div>
    );
  }

  const max = Math.max(...data.map((d) => d.value), 1);
  const barWidth = 100 / data.length;
  const gap = barWidth * 0.25;
  const usable = barWidth - gap;

  return (
    <div className="w-full" role="img" aria-label={ariaLabel}>
      <svg
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height }}
      >
        {[0.25, 0.5, 0.75, 1].map((ratio) => (
          <line
            key={ratio}
            x1="0"
            x2="100"
            y1={height - height * ratio}
            y2={height - height * ratio}
            stroke="currentColor"
            className="text-neutral-200"
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {data.map((entry, i) => {
          const barHeight = (entry.value / max) * (height - 8);
          return (
            <g key={entry.label}>
              <rect
                x={i * barWidth + gap / 2}
                y={height - barHeight}
                width={usable}
                height={Math.max(barHeight, 1)}
                className="fill-secondary"
                rx="0.6"
              >
                <title>{`${entry.label}: ${formatValue(entry.value)}`}</title>
              </rect>
            </g>
          );
        })}
      </svg>

      <div className="mt-2 grid gap-1" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}>
        {data.map((entry) => (
          <span
            key={entry.label}
            className="text-center text-[10px] uppercase tracking-wide text-secondary truncate"
            title={entry.label}
          >
            {entry.label}
          </span>
        ))}
      </div>

      <ul className="sr-only">
        {data.map((entry) => (
          <li key={entry.label}>
            {entry.label}: {formatValue(entry.value)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BarChart;
