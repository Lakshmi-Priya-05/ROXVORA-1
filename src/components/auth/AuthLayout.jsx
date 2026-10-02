import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

const AuthLayout = ({
  children,
  title = 'ROXVORA',
  subtitle = 'Premium Fashion & Lifestyle',
  className = '',
  showBackLink = true,
}) => {
  return (
    <div className={`min-h-screen flex ${className}`}>
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between relative overflow-hidden">
        <Link to="/" className="text-2xl font-secondary font-bold text-white" aria-label="ROXVORA Home">
          ROXVORA
        </Link>

        <div className="z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-secondary font-bold text-white mb-6"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-white/80 max-w-md"
          >
            {subtitle}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/50 text-sm"
        >
          &copy; {new Date().getFullYear()} ROXVORA. All rights reserved.
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-between mb-8">
            {showBackLink ? (
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors"
              >
                <FiArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back to store
              </Link>
            ) : (
              <span />
            )}
            <Link to="/" className="text-lg font-secondary font-bold text-primary" aria-label="ROXVORA Home">
              ROXVORA
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;