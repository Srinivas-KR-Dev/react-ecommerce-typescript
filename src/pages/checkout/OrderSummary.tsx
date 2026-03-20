import DeliveryOptions from './DeliveryOptions';
import CartItemDetails from './CartItemDetails';
import DeliveryDate from './DeliveryDate';
import type { Cart } from '../../types/cart';
import type { DeliveryOptions as DeliveryOptionsType } from '../../types/deliveryOptions';

type OrderSummaryProps = {
  deliveryOptions: DeliveryOptionsType;
  cart: Cart;
};

function OrderSummary({ deliveryOptions, cart }: OrderSummaryProps) {
  return (
    <div className='order-summary'>
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          return (
            <div key={cartItem.productId} className='cart-item-container'>
              <DeliveryDate
                deliveryOptions={deliveryOptions}
                cartItem={cartItem}
              />
              <div className='cart-item-details-grid'>
                <CartItemDetails cartItem={cartItem} />
                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  cartItem={cartItem}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default OrderSummary;
