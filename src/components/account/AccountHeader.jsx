import { FiUser, FiLogOut } from 'react-icons/fi';


const AccountHeader = ({
  user,
  onSignOut,
  className = '',
}) => {
  return (
    <header className={`bg-white border-b border-neutral-200 px-4 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <h1 className="text-xl lg:text-2xl font-secondary font-bold text-primary">My Account</h1>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3">
              <span className="text-sm text-secondary">{user?.email}</span>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <FiUser className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-ghost btn-sm text-error hover:text-error"
              onClick={onSignOut}
            >
              <FiLogOut className="w-5 h-5" aria-hidden="true" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AccountHeader;