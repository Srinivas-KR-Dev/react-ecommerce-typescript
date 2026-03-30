import { useState } from 'react';
import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import type { CartItem } from '../../types/cart';
import type { DeliveryOptions as DeliveryOptionsType } from '../../types/deliveryOptions';
import { useUpdateCartItem } from '../../hooks/useApi';

type DeliveryOptionsProps = {
  deliveryOptions: DeliveryOptionsType;
  cartItem: CartItem;
};

function DeliveryOptions({ deliveryOptions, cartItem }: DeliveryOptionsProps) {
  const updateCartItemMutation = useUpdateCartItem();
  const [optionErrors, setOptionErrors] = useState<Record<string, string | null>>(
    {},
  );

  return (
    <div className='delivery-options'>
      <div className='delivery-options-title'>Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = 'FREE Shipping';

        if (deliveryOption.priceCents > 0) {
          priceString = `${formatMoney(deliveryOption.priceCents)}-Shipping`;
        }

        const updateDeliveryOption = async () => {
          try {
            await updateCartItemMutation.mutateAsync({
              itemId: cartItem.productId,
              deliveryOptionId: deliveryOption.id,
            });
            setOptionErrors((prev) => ({
              ...prev,
              [deliveryOption.id]: null,
            }));
          } catch (error) {
            console.error('Failed to update delivery option:', error);

            const axiosError = error as {
              response?: { data?: { message?: string } };
              message?: string;
            };

            const message =
              axiosError.response?.data?.message ??
              axiosError.message ??
              'Failed to update delivery option. Please try again.';
            setOptionErrors((prev) => ({
              ...prev,
              [deliveryOption.id]: message,
            }));
          }
        };

        return (
          <div
            key={deliveryOption.id}
            className='delivery-option'
            onClick={updateDeliveryOption}
          >
            <input
              type='radio'
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() => {}}
              className='delivery-option-input'
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className='delivery-option-date'>
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  'dddd, MMMM D',
                )}
              </div>
              <div className='delivery-option-price'>{priceString}</div>
              {optionErrors[deliveryOption.id] && (
                <div
                  className='delivery-options-error'
                  style={{ marginTop: 4, color: 'red', fontSize: 13 }}
                >
                  {optionErrors[deliveryOption.id]}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DeliveryOptions;
