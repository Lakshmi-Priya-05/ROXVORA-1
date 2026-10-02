import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@components/common/Input/Input';
import Button from '@components/common/Button/Button';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { useState } from 'react';

const resetPasswordSchema = yup.object({
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Please confirm your password'),
});

const ResetPasswordForm = ({
  onSubmit,
  isSubmitting = false,
  isSuccess = false,
  className = '',
  onBackToLogin,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onChange',
  });

  if (isSuccess) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-primary mb-2">Password Reset!</h2>
        <p className="text-secondary mb-6">Your password has been successfully reset.</p>
        <Button variant="primary" onClick={onBackToLogin}>
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6 ${className}`} noValidate>
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-primary mb-2">Reset Password</h2>
        <p className="text-secondary">Enter your new password below</p>
      </div>

      <div className="relative">
        <Input
          {...register('password')}
          type={showPassword ? 'text' : 'password'}
          label="New Password"
          placeholder="••••••••"
          error={errors.password?.message}
          required
          autoComplete="new-password"
          className="pr-12"
        />
        <button
          type="button"
          className="absolute right-3 top-[38px] text-neutral-400 hover:text-primary transition-colors"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
        </button>
      </div>

      <div className="relative">
        <Input
          {...register('confirmPassword')}
          type={showPassword ? 'text' : 'password'}
          label="Confirm New Password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          required
          autoComplete="new-password"
          className="pr-12"
        />
        <button
          type="button"
          className="absolute right-3 top-[38px] text-neutral-400 hover:text-primary transition-colors"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
        </button>
      </div>

      <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting}>
        Reset Password
      </Button>

      {onBackToLogin && (
        <p className="text-center text-sm text-secondary">
          <button
            type="button"
            className="text-primary font-medium hover:underline"
            onClick={onBackToLogin}
          >
            Back to Sign In
          </button>
        </p>
      )}
    </form>
  );
};

export default ResetPasswordForm;