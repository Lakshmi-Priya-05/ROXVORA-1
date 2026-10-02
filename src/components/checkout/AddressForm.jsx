import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@components/common/Input/Input';
import Select from '@components/common/Select/Select';
import Button from '@components/common/Button/Button';

const addressSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  company: yup.string(),
  address1: yup.string().required('Address is required'),
  address2: yup.string(),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  postalCode: yup.string().required('Postal code is required'),
  country: yup.string().required('Country is required'),
  phone: yup.string().matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Invalid phone number'),
  isDefault: yup.boolean(),
});

const AddressForm = ({
  onSubmit,
  defaultValues = {},
  isSubmitting = false,
  className = '',
  showDefaultCheckbox = true,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
    defaultValues,
    mode: 'onChange',
  });

  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
  ];

  const states = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
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
        {...register('company')}
        label="Company (Optional)"
        placeholder="Company Name"
      />

      <Input
        {...register('address1')}
        label="Address"
        placeholder="123 Main Street"
        error={errors.address1?.message}
        required
      />

      <Input
        {...register('address2')}
        label="Apartment, Suite, etc. (Optional)"
        placeholder="Apt 4B"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          {...register('city')}
          label="City"
          placeholder="New York"
          error={errors.city?.message}
          required
        />
        <Select
          {...register('state')}
          label="State"
          options={states}
          placeholder="Select state"
          error={errors.state?.message}
          required
        />
        <Input
          {...register('postalCode')}
          label="ZIP Code"
          placeholder="10001"
          error={errors.postalCode?.message}
          required
        />
      </div>

      <Select
        {...register('country')}
        label="Country"
        options={countries}
        placeholder="Select country"
        error={errors.country?.message}
        required
      />

      <Input
        {...register('phone')}
        type="tel"
        label="Phone Number"
        placeholder="+1 (555) 000-0000"
        error={errors.phone?.message}
        autoComplete="tel"
      />

      {showDefaultCheckbox && (
        <div className="flex items-center gap-3">
          <input
            {...register('isDefault')}
            type="checkbox"
            id="is-default"
            className="w-4 h-4 text-secondary border-neutral-300 rounded focus:ring-secondary focus:ring-2"
          />
          <label htmlFor="is-default" className="text-sm text-secondary cursor-pointer">
            Set as default address
          </label>
        </div>
      )}

      <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting}>
        Save Address
      </Button>
    </form>
  );
};

export default AddressForm;