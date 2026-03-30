import { useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { useRemoveFromCart, useUpdateCartItem } from '../../hooks/useApi';
import type { CartItem } from '../../types/cart';
import { formatMoney } from '../../utils/money';

type CartItemDetailsProps = {
  cartItem: CartItem;
};

function CartItemDetails({ cartItem }: CartItemDetailsProps) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const removeFromCartMutation = useRemoveFromCart();
  const updateCartItemMutation = useUpdateCartItem();

  const deleteCartItem = async () => {
    try {
      await removeFromCartMutation.mutateAsync(cartItem.productId);
      setErrorMessage(null);
    } catch (error) {
      console.error('Failed to delete cart item:', error);

      const axiosError = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };

      const message =
        axiosError.response?.data?.message ??
        axiosError.message ??
        'Failed to delete item. Please try again.';
      setErrorMessage(message);
    }
  };

  const updateQuantity = async () => {
    // Enter edit mode.
    if (!isUpdatingQuantity) {
      setErrorMessage(null);
      setQuantity(cartItem.quantity);
      setIsUpdatingQuantity(true);
      return;
    }

    // Save edit.
    setIsUpdatingQuantity(false);

    try {
      const savedQuantity = Number(quantity);
      await updateCartItemMutation.mutateAsync({
        itemId: cartItem.product.id,
        quantity: savedQuantity,
      });
      setErrorMessage(null);
      // Keep the saved value locally; parent cart data may still be stale until refetch finishes.
      setQuantity(savedQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);

      const axiosError = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };

      const message =
        axiosError.response?.data?.message ??
        axiosError.message ??
        'Failed to update quantity. Please try again.';
      setIsUpdatingQuantity(false);
      setErrorMessage(message);
      // Reset the input value so the next edit starts from the current cart quantity.
      setQuantity(cartItem.quantity);
    }
  };

  const updateQuantityInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateQuantity();
    } else if (event.key === 'Escape') {
      setQuantity(cartItem.quantity);
      setIsUpdatingQuantity(false);
    }
  };

  return (
    <>
      <img className='product-image' src={cartItem.product.image} />

      <div className='cart-item-details'>
        <div className='product-name'>{cartItem.product.name}</div>
        <div className='product-price'>
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className='product-quantity'>
          <span>
            Quantity:
            {isUpdatingQuantity ? (
              <input
                className='quantity-input'
                type='number'
                min={1}
                max={10}
                value={quantity}
                onChange={updateQuantityInput}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <span className='quantity-label'>{cartItem.quantity}</span>
            )}
          </span>
          <span
            className='update-quantity-link link-primary'
            onClick={updateQuantity}
          >
            {isUpdatingQuantity ? 'Save' : 'Update'}
          </span>
          <span
            className='delete-quantity-link link-primary'
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
        {errorMessage && (
          <div
            className='cart-item-error'
            style={{ marginTop: 6, color: 'red', fontSize: 13 }}
          >
            {errorMessage}
          </div>
        )}
      </div>
    </>
  );
}

export default CartItemDetails;
