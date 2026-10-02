import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@store/slices/authSlice';
import { FiUser, FiPackage, FiMapPin, FiHeart, FiSettings, FiLogOut, FiCreditCard } from 'react-icons/fi';

const AccountSidebar = ({ className = '' }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const navItems = [
    { id: 'profile', label: 'Profile', href: '/account', icon: FiUser },
    { id: 'orders', label: 'Orders', href: '/account/orders', icon: FiPackage },
    { id: 'addresses', label: 'Addresses', href: '/account/addresses', icon: FiMapPin },
    { id: 'payment', label: 'Payment Methods', href: '/account/payment', icon: FiCreditCard },
    { id: 'wishlist', label: 'Wishlist', href: '/wishlist', icon: FiHeart },
    { id: 'settings', label: 'Settings', href: '/account/settings', icon: FiSettings },
  ];

  return (
    <aside className={`w-full lg:w-64 bg-white border-r border-neutral-200 ${className}`} aria-label="Account navigation">
      <nav className="p-4 lg:p-6" role="navigation" aria-label="Account menu">
        <ul className="space-y-1" role="list">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-secondary'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 pt-6 border-t">
          <button
            type="button"
            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-error hover:bg-neutral-100 rounded-lg transition-colors"
            onClick={handleSignOut}
          >
            <FiLogOut className="w-5 h-5" aria-hidden="true" />
            Sign Out
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default AccountSidebar;