
import { Link, useLocation } from 'react-router-dom';
import { FiX, FiUser, FiHeart, FiShoppingBag as FiShoppingBagIcon, FiTag, FiStar, FiInfo, FiPhone, FiPackage, FiHeart as FiHeartIcon, FiShoppingCart, FiSettings } from 'react-icons/fi';

import { useSelector } from 'react-redux';
import { selectCartItems } from '@store/slices/cartSlice';
import { selectWishlistCount } from '@store/slices/wishlistSlice';

const MobileNavbar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const cartCount = useSelector(selectCartItems).reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = useSelector(selectWishlistCount);

  const menuItems = [
    { label: 'Shop', href: '/shop', icon: FiShoppingBagIcon },
    { label: 'Women', href: '/shop/women', icon: FiUser },
    { label: 'Men', href: '/shop/men', icon: FiUser },
    { label: 'Kids', href: '/shop/kids', icon: FiHeart },
    { label: 'Accessories', href: '/shop/accessories', icon: FiShoppingBagIcon },
    { label: 'Sale', href: '/shop/sale', icon: FiTag },
    { label: 'New Arrivals', href: '/shop/new', icon: FiStar },
    { label: 'About Us', href: '/about', icon: FiInfo },
    { label: 'Contact', href: '/contact', icon: FiPhone },
  ];

  const accountItems = [
    { label: 'My Account', href: '/account', icon: FiUser },
    { label: 'Orders', href: '/account/orders', icon: FiPackage },
    { label: 'Wishlist', href: '/wishlist', icon: FiHeartIcon, badge: wishlistCount },
    { label: 'Cart', href: '/cart', icon: FiShoppingCart, badge: cartCount },
    { label: 'Settings', href: '/account/settings', icon: FiSettings },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="navigation"
        aria-label="Mobile menu"
        aria-hidden={!isOpen}
        {...(!isOpen ? { inert: '' } : {})}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-primary">Menu</h2>
            <button
              type="button"
              className="btn btn-ghost btn-icon"
              onClick={onClose}
              aria-label="Close menu"
            >
              <FiX className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4" aria-label="Primary">
            <ul className="space-y-1" role="list">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-3 text-base font-medium rounded-lg transition-colors ${
                      location.pathname === item.href
                        ? 'bg-primary-50 text-secondary'
                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary'
                    }`}
                    onClick={onClose}
                  >
                    <item.icon className="w-5 h-5" aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="px-3 pt-4 mt-4 border-t text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Account
            </h3>
            <ul className="space-y-1" role="list">
              {accountItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`flex items-center justify-between px-3 py-3 text-base font-medium rounded-lg transition-colors ${
                      location.pathname === item.href
                        ? 'bg-primary-50 text-secondary'
                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary'
                    }`}
                    onClick={onClose}
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" aria-hidden="true" />
                      {item.label}
                    </span>
                    {item.badge > 0 && (
                      <span className="badge badge-primary badge-sm">{item.badge}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <Link
              to="/login"
              className="btn btn-primary btn-full btn-md"
              onClick={onClose}
            >
              Sign In
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileNavbar;