import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@components/common/Input/Input';
import Select from '@components/common/Select/Select';
import Button from '@components/common/Button/Button';

const productSchema = yup.object({
  name: yup.string().required('Product name is required'),
  slug: yup.string().required('Slug is required'),
  description: yup.string().required('Description is required'),
  shortDescription: yup.string(),
  price: yup.number().positive('Price must be positive').required('Price is required'),
  originalPrice: yup.number().positive(),
  category: yup.string().required('Category is required'),
  brand: yup.string(),
  sku: yup.string().required('SKU is required'),
  stock: yup.number().integer().min(0).required('Stock is required'),
  isActive: yup.boolean(),
  isFeatured: yup.boolean(),
  isNew: yup.boolean(),
  isSale: yup.boolean(),
  tags: yup.string(),
});

const ProductForm = ({
  onSubmit,
  defaultValues = {},
  isSubmitting = false,
  className = '',
  categories = [],
  brands = [],
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues,
    mode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6 ${className}`} noValidate>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="font-semibold text-primary mb-4">Basic Information</h3>
            <div className="space-y-4">
              <Input
                {...register('name')}
                label="Product Name"
                placeholder="Enter product name"
                error={errors.name?.message}
                required
              />
              <Input
                {...register('slug')}
                label="Slug (URL)"
                placeholder="product-name"
                error={errors.slug?.message}
                required
                helperText="Auto-generated from name if left empty"
              />
            </div>
          </div>

          <div>
            <label htmlFor="product-description" className="block text-sm font-medium text-primary mb-1">
              Description
            </label>
            <textarea
              id="product-description"
              {...register('description')}
              rows={8}
              className="input-field"
              placeholder="Enter product description"
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? 'product-description-error' : undefined}
              required
            />
            {errors.description && (
              <p id="product-description-error" role="alert" className="text-error text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">Short Description</label>
            <textarea
              {...register('shortDescription')}
              rows={3}
              className="input-field"
              placeholder="Brief description for listings"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-semibold text-primary mb-4">Pricing & Inventory</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <Input
                {...register('sku')}
                label="SKU"
                placeholder="PROD-001"
                error={errors.sku?.message}
                required
              />

              <Input
                {...register('stock', { valueAsNumber: true })}
                type="number"
                label="Stock Quantity"
                placeholder="0"
                error={errors.stock?.message}
                required
                min="0"
              />

              <Select
                {...register('category')}
                label="Category"
                options={categories.map((c) => ({ value: c.id, label: c.name }))}
                placeholder="Select category"
                error={errors.category?.message}
                required
              />

              <Select
                {...register('brand')}
                label="Brand"
                options={brands.map((b) => ({ value: b.id, label: b.name }))}
                placeholder="Select brand"
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  {...register('weight', { valueAsNumber: true })}
                  type="number"
                  label="Weight (kg)"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
                <Select
                  {...register('taxClass')}
                  label="Tax Class"
                  options={[
                    { value: 'standard', label: 'Standard' },
                    { value: 'reduced', label: 'Reduced' },
                    { value: 'zero', label: 'Zero Rate' },
                  ]}
                  placeholder="Select tax class"
                />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-primary mb-4">Status & Visibility</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input {...register('isActive')} type="checkbox" className="w-4 h-4 text-secondary border-neutral-300 rounded focus:ring-secondary focus:ring-2" />
                <span className="text-sm text-secondary">Active</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input {...register('isFeatured')} type="checkbox" className="w-4 h-4 text-secondary border-neutral-300 rounded focus:ring-secondary focus:ring-2" />
                <span className="text-sm text-secondary">Featured</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input {...register('isNew')} type="checkbox" className="w-4 h-4 text-secondary border-neutral-300 rounded focus:ring-secondary focus:ring-2" />
                <span className="text-sm text-secondary">New Arrival</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input {...register('isSale')} type="checkbox" className="w-4 h-4 text-secondary border-neutral-300 rounded focus:ring-secondary focus:ring-2" />
                <span className="text-sm text-secondary">On Sale</span>
              </label>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-primary mb-4">Tags</h3>
            <Input
              {...register('tags')}
              label="Tags (comma separated)"
              placeholder="summer, dress, floral"
            />
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t p-4 flex gap-3 lg:hidden">
        <Button type="button" variant="secondary" className="flex-1">Cancel</Button>
        <Button type="submit" variant="primary" className="flex-1" isLoading={isSubmitting}>
          Save Product
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;