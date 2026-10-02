import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@components/common/Input/Input';
import Button from '@components/common/Button/Button';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { useState } from 'react';

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  rememberMe: yup.boolean(),
});

const LoginForm = ({
  onSubmit,
  isSubmitting = false,
  className = '',
  onForgotPassword,
  onSwitchToRegister,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6 ${className}`} noValidate>
      <Input
        {...register('email')}
        type="email"
        label="Email"
        placeholder="you@example.com"
        error={errors.email?.message}
        required
        autoComplete="email"
        autoFocus
      />

      <div className="relative">
        <Input
          {...register('password')}
          type={showPassword ? 'text' : 'password'}
          label="Password"
          placeholder="••••••••"
          error={errors.password?.message}
          required
          autoComplete="current-password"
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

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            {...register('rememberMe')}
            type="checkbox"
            className="w-4 h-4 text-secondary border-neutral-300 rounded focus:ring-secondary focus:ring-2"
          />
          <span className="text-sm text-secondary">Remember me</span>
        </label>

        {onForgotPassword && (
          <button
            type="button"
            className="text-sm text-secondary hover:text-primary"
            onClick={onForgotPassword}
          >
            Forgot password?
          </button>
        )}
      </div>

      <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting}>
        Sign In
      </Button>

      {onSwitchToRegister && (
        <p className="text-center text-sm text-secondary">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            className="text-primary font-medium hover:underline"
            onClick={onSwitchToRegister}
          >
            Sign Up
          </button>
        </p>
      )}
    </form>
  );
};

export default LoginForm;