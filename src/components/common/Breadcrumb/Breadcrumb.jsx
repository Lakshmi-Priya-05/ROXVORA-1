import { FiChevronRight, FiHome } from 'react-icons/fi';

import Link from 'react-router-dom';

const Breadcrumb = ({
  items = [],
  separator = <FiChevronRight className="w-4 h-4 text-neutral-400" aria-hidden="true" />,
  className = '',
  'aria-label': ariaLabel = 'Breadcrumb',
}) => {
  if (items.length === 0) return null;

  return (
    <nav className={className} aria-label={ariaLabel}>
      <ol className="flex items-center gap-2 text-sm" role="list">
        <li>
          <Link to="/" className="flex items-center gap-1 text-neutral-500 hover:text-primary transition-colors" aria-label="Home">
            <FiHome className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.label || index} className="flex items-center gap-2">
            {index > 0 && <span className="text-neutral-400" aria-hidden="true">{separator}</span>}
            {item.href ? (
              <Link
                to={item.href}
                className="text-neutral-500 hover:text-primary transition-colors"
                aria-current={item.isCurrent ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-primary font-medium" aria-current={item.isCurrent ? 'page' : undefined}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;