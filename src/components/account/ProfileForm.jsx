import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@components/common/Input/Input';
import Select from '@components/common/Select/Select';
import Button from '@components/common/Button/Button';

const profileSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Invalid phone number'),
  dateOfBirth: yup.string(),
  gender: yup.string(),
  newsletter: yup.boolean(),
});

const ProfileForm = ({
  onSubmit,
  defaultValues = {},
  isSubmitting = false,
  className = '',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues,
    mode: 'onChange',
  });

  const genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  ];

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
        placeholder="+1 (555) 000-0000"
        error={errors.phone?.message}
        autoComplete="tel"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          {...register('dateOfBirth')}
          type="date"
          label="Date of Birth"
          error={errors.dateOfBirth?.message}
        />
        <Select
          {...register('gender')}
          label="Gender"
          options={genders}
          placeholder="Select gender"
          error={errors.gender?.message}
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          {...register('newsletter')}
          type="checkbox"
          id="newsletter"
          className="w-4 h-4 text-secondary border-neutral-300 rounded focus:ring-secondary focus:ring-2"
        />
        <label htmlFor="newsletter" className="text-sm text-secondary cursor-pointer">
          Subscribe to newsletter for updates and offers
        </label>
      </div>

      <Button type="submit" variant="primary" isLoading={isSubmitting}>
        Save Changes
      </Button>
    </form>
  );
};

export default ProfileForm;