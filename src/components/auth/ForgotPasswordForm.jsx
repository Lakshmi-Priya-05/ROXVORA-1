import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@components/common/Input/Input';
import Button from '@components/common/Button/Button';

const forgotPasswordSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPasswordForm = ({
  onSubmit,
  isSubmitting = false,
  isSuccess = false,
  className = '',
  onBackToLogin,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
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
        <h2 className="text-xl font-semibold text-primary mb-2">Check Your Email</h2>
        <p className="text-secondary mb-6">We&apos;ve sent password reset instructions to your email address.</p>
        <Button variant="secondary" onClick={onBackToLogin}>
          Back to Sign In
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6 ${className}`} noValidate>
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-primary mb-2">Forgot Password?</h2>
        <p className="text-secondary">Enter your email and we&apos;ll send you reset instructions</p>
      </div>

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

      <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting}>
        Send Reset Link
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

export default ForgotPasswordForm;