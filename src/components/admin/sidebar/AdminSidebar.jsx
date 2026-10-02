import { Link, useLocation } from 'react-router-dom';
import { FiGrid, FiBox, FiTag, FiShoppingBag, FiUsers, FiDollarSign, FiHome, FiSettings, FiChevronRight, FiMenu, FiLogOut } from 'react-icons/fi';


const AdminSidebar = ({ isOpen, onClose, className = '' }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: FiGrid },
    { label: 'Products', href: '/admin/products', icon: FiBox },
    { label: 'Categories', href: '/admin/categories', icon: FiTag },
    { label: 'Orders', href: '/admin/orders', icon: FiShoppingBag },
    { label: 'Customers', href: '/admin/customers', icon: FiUsers },
    { label: 'Offers', href: '/admin/offers', icon: FiDollarSign },
    { label: 'Content', href: '/admin/content', icon: FiHome },
    { label: 'Settings', href: '/admin/settings', icon: FiSettings },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-200 transform transition-transform duration-300 lg:translate-x-0 lg:relative ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${className}`}
      aria-label="Admin navigation"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b lg:hidden">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="text-xl font-secondary font-bold text-primary">ROXVORA</span>
            <span className="badge badge-primary badge-xs">Admin</span>
          </Link>
          <button type="button" className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Close sidebar">
            <FiMenu className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" role="navigation" aria-label="Admin menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');

            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-secondary'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary'
                }`}
                aria-current={isActive ? 'page' : undefined}
                onClick={onClose}
              >
                <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                {item.label}
                {isActive && <FiChevronRight className="w-4 h-4 ml-auto text-secondary" aria-hidden="true" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t lg:hidden">
          <button type="button" className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-error hover:bg-neutral-100 rounded-lg transition-colors">
            <FiLogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;