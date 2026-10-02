import { FiSearch, FiBell, FiUser, FiMenu } from 'react-icons/fi';


const AdminHeader = ({ onMenuClick, className = '' }) => {
  return (
    <header className={`h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 ${className}`}>
      <button
        type="button"
        className="btn btn-ghost btn-icon lg:hidden"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <FiMenu className="w-6 h-6" />
      </button>

      <div className="flex-1 max-w-xl mx-4 lg:mx-0">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search products, orders, customers..."
            className="w-full pl-10 pr-4 py-2 bg-neutral-100 border-0 rounded-lg text-primary placeholder-neutral-400 focus:bg-white focus:ring-2 focus:ring-secondary focus:outline-none transition-all"
            aria-label="Admin search"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <button
          type="button"
          className="btn btn-ghost btn-icon relative"
          aria-label="Notifications"
        >
          <FiBell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
        </button>

        <div className="hidden lg:flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <FiUser className="w-5 h-5 text-white" />
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-primary">Admin User</p>
            <p className="text-xs text-secondary">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;