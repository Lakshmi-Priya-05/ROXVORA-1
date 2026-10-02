import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';


const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  className = '',
  'aria-label': ariaLabel = 'Pagination',
}) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const halfVisible = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(1, currentPage - halfVisible);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav
      className={`flex items-center justify-center gap-1 ${className}`}
      aria-label={ariaLabel}
      role="navigation"
    >
      {showFirstLast && currentPage > 1 && (
        <button
          type="button"
          className="btn btn-ghost btn-icon-sm"
          onClick={() => handlePageClick(1)}
          aria-label="Go to first page"
        >
          <FiChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span className="visually-hidden">First page</span>
        </button>
      )}

      {showPrevNext && currentPage > 1 && (
        <button
          type="button"
          className="btn btn-ghost btn-icon-sm"
          onClick={() => handlePageClick(currentPage - 1)}
          aria-label="Go to previous page"
        >
          <FiChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span className="visually-hidden">Previous page</span>
        </button>
      )}

      {startPage > 1 && (
        <>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => handlePageClick(1)}
            aria-label="Page 1"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="px-2 text-secondary" aria-hidden="true">...</span>
          )}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`btn btn-sm ${page === currentPage ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => handlePageClick(page)}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 text-secondary" aria-hidden="true">...</span>
          )}
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => handlePageClick(totalPages)}
            aria-label={`Page ${totalPages}`}
          >
            {totalPages}
          </button>
        </>
      )}

      {showPrevNext && currentPage < totalPages && (
        <button
          type="button"
          className="btn btn-ghost btn-icon-sm"
          onClick={() => handlePageClick(currentPage + 1)}
          aria-label="Go to next page"
        >
          <FiChevronRight className="w-4 h-4" aria-hidden="true" />
          <span className="visually-hidden">Next page</span>
        </button>
      )}

      {showFirstLast && currentPage < totalPages && (
        <button
          type="button"
          className="btn btn-ghost btn-icon-sm"
          onClick={() => handlePageClick(totalPages)}
          aria-label="Go to last page"
        >
          <FiChevronRight className="w-4 h-4" aria-hidden="true" />
          <span className="visually-hidden">Last page</span>
        </button>
      )}
    </nav>
  );
};

export default Pagination;