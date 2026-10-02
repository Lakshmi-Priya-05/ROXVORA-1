import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@components/common/Input/Input';
import Select from '@components/common/Select/Select';
import Button from '@components/common/Button/Button';

const variantSchema = yup.object({
  name: yup.string().required('Variant name is required'),
  sku: yup.string().required('SKU is required'),
  price: yup.number().positive('Price must be positive').required('Price is required'),
  originalPrice: yup.number().positive(),
  stock: yup.number().integer().min(0).required('Stock is required'),
  size: yup.string(),
  color: yup.string(),
  image: yup.string(),
  isActive: yup.boolean(),
});

const VariantForm = ({
  onSubmit,
  defaultValues = {},
  isSubmitting = false,
  className = '',
  sizes = [],
  colors = [],
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(variantSchema),
    defaultValues,
    mode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          {...register('name')}
          label="Variant Name"
          placeholder="e.g., Red / Large"
          error={errors.name?.message}
          required
        />
        <Input
          {...register('sku')}
          label="SKU"
          placeholder="VAR-001"
          error={errors.sku?.message}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          {...register('price', { valueAsNumber: true })}
          type="number"
          label="Price ($)"
          placeholder="0.00"
          error={errors.price?.message}
          required
          step="0.01"
          min="0"
        />
        <Input
          {...register('originalPrice', { valueAsNumber: true })}
          type="number"
          label="Original Price ($)"
          placeholder="0.00"
          step="0.01"
          min="0"
        />
        <Input
          {...register('stock', { valueAsNumber: true })}
          type="number"
          label="Stock"
          placeholder="0"
          error={errors.stock?.message}
          required
          min="0"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          {...register('size')}
          label="Size"
          options={sizes.map((s) => ({ value: s, label: s }))}
          placeholder="Select size"
        />
        <Select
          {...register('color')}
          label="Color"
          options={colors.map((c) => ({ value: c.value, label: c.name }))}
          placeholder="Select color"
        />
      </div>

      <Input
        {...register('image')}
        type="url"
        label="Image URL"
        placeholder="https://example.com/image.jpg"
      />

      <div className="flex items-center gap-3">
        <input {...register('isActive')} type="checkbox" id="variant-active" className="w-4 h-4 text-secondary border-neutral-300 rounded focus:ring-secondary focus:ring-2" />
        <label htmlFor="variant-active" className="text-sm text-secondary cursor-pointer">Active</label>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="secondary">Cancel</Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          Save Variant
        </Button>
      </div>
    </form>
  );
};

export default VariantForm;