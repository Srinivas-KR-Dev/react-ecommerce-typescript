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
  const removeFromCartMutation = useRemoveFromCart();
  const updateCartItemMutation = useUpdateCartItem();

  const deleteCartItem = async () => {
    try {
      await removeFromCartMutation.mutateAsync(cartItem.productId);
    } catch (error) {
      console.error('Failed to delete cart item:', error);
    }
  };

  const updateQuantity = async () => {
    if (isUpdatingQuantity) {
      setIsUpdatingQuantity(false);
    } else {
      setIsUpdatingQuantity(true);
      return;
    }

    try {
      await updateCartItemMutation.mutateAsync({
        itemId: cartItem.product.id,
        quantity: Number(quantity),
      });
    } catch (error) {
      console.error('Failed to update quantity:', error);
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
      </div>
    </>
  );
}

export default CartItemDetails;
