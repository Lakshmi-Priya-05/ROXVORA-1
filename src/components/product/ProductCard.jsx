import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiAward, FiStar, FiTag, FiZap } from 'react-icons/fi';

import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '@store/slices/wishlistSlice';
import { addToCart } from '@store/slices/cartSlice';
import Price from '@components/common/Price/Price';
import Rating from '@components/common/Rating/Rating';
import Badge from './ProductBadge';

const ProductCard = ({
  product,
  variant = 'default',
  showWishlist = true,
  showAddToCart = true,
  className = '',
}) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  // One discount chip carries the strongest signal; "Sale" only appears when a
  // product is on sale without a stated discount, so cards never stack noise.
  const flags = [];
  if (product.discountPercent > 0) {
    flags.push({ key: 'discount', label: `-${product.discountPercent}%`, tone: 'gold', icon: FiTag });
  }
  if (product.isNew) {
    flags.push({ key: 'new', label: 'New', tone: 'glassGold', icon: FiStar });
  } else if (product.isBestseller) {
    flags.push({ key: 'bestseller', label: 'Bestseller', tone: 'glass', icon: FiAward });
  } else if (product.isSale && product.discountPercent <= 0) {
    flags.push({ key: 'sale', label: 'Sale', tone: 'sale', icon: FiZap });
  }

  const cardStyles = {
    default: 'card group',
    minimal: 'card group p-0',
    featured: 'card group relative overflow-hidden',
  };

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  return (
    <article className={`${cardStyles[variant]} ${className} flex flex-col`} data-product-id={product.id}>
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Link
          to={`/product/${product.slug}`}
          className="block h-full w-full"
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.images?.[0] || '/images/placeholders/product.jpg'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {product.images?.[1] && (
          <img
            src={product.images[1]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            loading="lazy"
            aria-hidden="true"
          />
        )}

        {/* Legibility scrim so flags read on light photography */}
        {flags.length > 0 && (
          <div
            className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-primary-900/45 to-transparent pointer-events-none"
            aria-hidden="true"
          />
        )}

        {flags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5" aria-label="Product badges">
            {flags.map((flag) => (
              <Badge key={flag.key} label={flag.label} tone={flag.tone} icon={flag.icon} size="sm" />
            ))}
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-primary-900/55 flex items-center justify-center">
            <span className="px-4 py-2 rounded-full bg-white/95 text-primary-900 text-xs font-semibold uppercase tracking-[0.2em]">
              Sold out
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 focus-within:opacity-100 focus-within:translate-x-0 transition-all duration-300">
          {showWishlist && (
            <button
              type="button"
              className={`btn btn-ghost btn-icon-sm rounded-full bg-white/90 backdrop-blur-sm hover:bg-white ${
                isInWishlist ? 'text-error' : 'text-primary-900'
              }`}
              onClick={handleWishlistToggle}
              aria-label={isInWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
              aria-pressed={isInWishlist}
            >
              <FiHeart className={`${isInWishlist ? 'fill-current' : ''} w-5 h-5`} aria-hidden="true" />
            </button>
          )}
        </div>

        {showAddToCart && (
          <button
            type="button"
            className="absolute bottom-0 inset-x-0 btn btn-primary btn-md opacity-0 translate-y-full group-hover:translate-y-0 focus-visible:translate-y-0 transition-all duration-300 rounded-none justify-center"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            <FiShoppingBag className="w-4 h-4" aria-hidden="true" />
            Add to Cart
          </button>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <p className="text-xs font-medium text-secondary uppercase tracking-wider truncate">
            {product.category}
          </p>
          {product.rating && <Rating value={product.rating} max={5} size="xs" readonly />}
        </div>

        <Link
          to={`/product/${product.slug}`}
          className="block min-w-0"
          aria-label={`View ${product.name}`}
        >
          <h3
            className="font-medium text-primary truncate mb-1 group-hover:text-secondary transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-2 flex items-end justify-between gap-2">
          <Price current={product.price} original={product.originalPrice} />
          {isLowStock && (
            <span className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-warning">
              <span className="w-1.5 h-1.5 rounded-full bg-warning" aria-hidden="true" />
              Only {product.stock} left
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
