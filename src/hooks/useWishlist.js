import { useDispatch, useSelector } from 'react-redux';
import { selectWishlistItems, selectWishlistCount } from '@store/slices/wishlistSlice';
import { addToWishlist, removeFromWishlist, clearWishlist, moveToCart } from '@store/slices/wishlistSlice';

export const useWishlist = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectWishlistItems);
  const count = useSelector(selectWishlistCount);

  const addItem = (item) => dispatch(addToWishlist(item));
  const removeItem = (productId) => dispatch(removeFromWishlist(productId));
  const clear = () => dispatch(clearWishlist());
  const moveItemToCart = (productId) => dispatch(moveToCart(productId));

  const isInWishlist = (productId) => items.some((item) => item.id === productId);

  return {
    items,
    count,
    addItem,
    removeItem,
    clear,
    moveItemToCart,
    isInWishlist,
  };
};