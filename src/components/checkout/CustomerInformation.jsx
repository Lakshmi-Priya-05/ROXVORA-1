import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@components/common/Input/Input';
import Button from '@components/common/Button/Button';

const customerSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phone: yup.string().matches(/^(\+91[-\s]?)?[0]?[6789]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  newsletter: yup.boolean(),
});

const CustomerInformation = ({
  onSubmit,
  onBack,
  defaultValues = {},
  isSubmitting = false,
  className = '',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerSchema),
    defaultValues,
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
        />
        <Input
          {...register('lastName')}
          label="Last Name"
          placeholder="Doe"
          error={errors.lastName?.message}
          required
        />
      </div>

      <Input
        {...register('email')}
        type="email"
        label="Email"
        placeholder="john@example.com"
        error={errors.email?.message}
        required
        autoComplete="email"
      />

      <Input
        {...register('phone')}
        type="tel"
        label="Phone Number"
        placeholder="+91 98765 43210"
        error={errors.phone?.message}
        autoComplete="tel"
      />

      <div className="flex items-center gap-3">
        <input
          {...register('newsletter')}
          type="checkbox"
          id="newsletter"
          className="w-4 h-4 text-secondary border-neutral-300 rounded focus:ring-secondary focus:ring-2"
        />
        <label htmlFor="newsletter" className="text-sm text-secondary cursor-pointer">
          Subscribe to our newsletter for updates and offers
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button type="button" variant="secondary" size="lg" onClick={onBack} disabled={isSubmitting} className="w-full sm:w-auto">
          Back
        </Button>
        <Button type="submit" variant="primary" size="lg" loading={isSubmitting} className="w-full sm:flex-1">
          Continue to Shipping
        </Button>
      </div>
    </form>
  );
};

export default CustomerInformation;