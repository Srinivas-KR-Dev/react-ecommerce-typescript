import dayjs from 'dayjs';
import type { CartItem } from '../../types/cart';
import type { DeliveryOptions as DeliveryOptionsType } from '../../types/deliveryOptions';

type DeliveryDateProps = {
  cartItem: CartItem;
  deliveryOptions: DeliveryOptionsType;
};

function DeliveryDate({ cartItem, deliveryOptions }: DeliveryDateProps) {
  const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
    return deliveryOption.id === cartItem.deliveryOptionId;
  })!;

  return (
    <div className='delivery-date'>
      Delivery date:{' '}
      {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
        'dddd, MMMM D',
      )}
    </div>
  );
}

export default DeliveryDate;
