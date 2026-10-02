import { useState, useRef } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';


const ProductImageUpload = ({
  images = [],
  onImagesChange,
  maxImages = 10,
  className = '',
}) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith('image/'));
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).filter((file) => file.type.startsWith('image/'));
    handleFiles(files);
    e.target.value = '';
  };

  const handleFiles = (files) => {
    const newFiles = files.slice(0, maxImages - images.length);
    if (newFiles.length === 0) return;

    const newImages = newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: `temp-${Date.now()}-${Math.random()}`,
    }));

    onImagesChange?.([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange?.(newImages);
  };

  const reorderImages = (fromIndex, toIndex) => {
    const newImages = [...images];
    const [removed] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, removed);
    onImagesChange?.(newImages);
  };

  return (
    <div className={className}>
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive ? 'border-secondary bg-secondary-50' : 'border-neutral-200 hover:border-neutral-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="product-images-upload"
        />
        <label htmlFor="product-images-upload" className="cursor-pointer">
          <FiUpload className="w-10 h-10 mx-auto text-neutral-400 mb-4" aria-hidden="true" />
          <p className="text-primary font-medium mb-1">Drag & drop images here</p>
          <p className="text-sm text-secondary">or click to browse</p>
          <p className="text-xs text-neutral-400 mt-2">Max {maxImages} images • PNG, JPG, WebP • Max 5MB each</p>
        </label>
      </div>

      {images.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium text-primary mb-3">Uploaded Images ({images.length}/{maxImages})</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {images.map((image, index) => (
              <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden group">
                <img
                  src={image.preview || image.url}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 btn btn-ghost btn-icon-sm bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  aria-label={`Remove image ${index + 1}`}
                >
                  <FiX className="w-4 h-4 text-error" />
                </button>
                <div className="absolute bottom-1 left-1 right-1 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    className="btn btn-ghost btn-icon-sm bg-white/90"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (index > 0) reorderImages(index, index - 1);
                    }}
                    disabled={index === 0}
                    aria-label="Move up"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-icon-sm bg-white/90"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (index < images.length - 1) reorderImages(index, index + 1);
                    }}
                    disabled={index === images.length - 1}
                    aria-label="Move down"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageUpload;