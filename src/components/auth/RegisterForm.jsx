import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@components/common/Input/Input';
import Button from '@components/common/Button/Button';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { useState } from 'react';
import { Link } from 'react-router-dom';

const registerSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Please confirm your password'),
  agreeToTerms: yup.boolean().oneOf([true], 'You must agree to the terms'),
  newsletter: yup.boolean(),
});

const RegisterForm = ({
  onSubmit,
  isSubmitting = false,
  className = '',
  onSwitchToLogin,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6 ${className}`} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          {...register('firstName')}
          label="First Name"
          placeholder="John"
          error={errors.firstName?.message}
          required
          autoComplete="given-name"
          autoFocus
        />
        <Input
          {...register('lastName')}
          label="Last Name"
          placeholder="Doe"
          error={errors.lastName?.message}
          required
          autoComplete="family-name"
        />
      </div>

      <Input
        {...register('email')}
        type="email"
        label="Email"
        placeholder="you@example.com"
        error={errors.email?.message}
        required
        autoComplete="email"
      />

      <div className="relative">
        <Input
          {...register('password')}
          type={showPassword ? 'text' : 'password'}
          label="Password"
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
          label="Confirm Password"
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

      <div className="flex items-start gap-3">
        <input
          {...register('agreeToTerms')}
          type="checkbox"
          id="agree-terms"
          className="w-4 h-4 text-secondary border-neutral-300 rounded focus:ring-secondary focus:ring-2 mt-1"
        />
        <label htmlFor="agree-terms" className="text-sm text-secondary">
          I agree to the{' '}
          <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
        </label>
      </div>

      <div className="flex items-center gap-3">
        <input
          {...register('newsletter')}
          type="checkbox"
          id="newsletter"
          className="w-4 h-4 text-secondary border-neutral-300 rounded focus:ring-secondary focus:ring-2"
        />
        <label htmlFor="newsletter" className="text-sm text-secondary cursor-pointer">
          Subscribe to newsletter
        </label>
      </div>

      <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting}>
        Create Account
      </Button>

      {onSwitchToLogin && (
        <p className="text-center text-sm text-secondary">
          Already have an account?{' '}
          <button
            type="button"
            className="text-primary font-medium hover:underline"
            onClick={onSwitchToLogin}
          >
            Sign In
          </button>
        </p>
      )}
    </form>
  );
};

export default RegisterForm;