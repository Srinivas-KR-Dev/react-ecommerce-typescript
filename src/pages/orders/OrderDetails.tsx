import { Fragment, useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router';
import { useAddToCart } from '../../hooks/useApi';
import type { Order } from '../../types/orders';

type OrderDetailsProps = {
  order: Order;
};

function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className='order-details-grid'>
      {order.products.map((orderProduct) => {
        return (
          <Fragment key={orderProduct.product.id}>
            <div className='product-image-container'>
              <img src={orderProduct.product.image} />
            </div>

            <OrderProductRow order={order} orderProduct={orderProduct} />

            <div className='product-actions'>
              <Link to={`/tracking/${order.id}/${orderProduct.product.id}`}>
                <button className='track-package-button button-secondary'>
                  Track package
                </button>
              </Link>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

type OrderProductRowProps = {
  order: Order;
  orderProduct: Order['products'][number];
};

function OrderProductRow({ orderProduct }: OrderProductRowProps) {
  const [displayAddedMessage, setDisplayAddedMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const addToCartMutation = useAddToCart();

  const addToCart = async () => {
    try {
      await addToCartMutation.mutateAsync({
        productId: orderProduct.product.id,
        quantity: 1,
      });
      setErrorMessage(null);
      setDisplayAddedMessage(true);
      window.setTimeout(() => {
        setDisplayAddedMessage(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);

      const axiosError = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };

      const message =
        axiosError.response?.data?.message ??
        axiosError.message ??
        'Failed to add to cart. Please try again.';
      setErrorMessage(message);
    }
  };

  return (
    <div className='product-details'>
      <div className='product-name'>{orderProduct.product.name}</div>
      <div className='product-delivery-date'>
        Arriving on:{' '}
        {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
      </div>
      <div className='product-quantity'>Quantity: {orderProduct.quantity}</div>
      <button className='buy-again-button button-primary' onClick={addToCart}>
        <img
          className='buy-again-icon'
          src={`images/icons/${displayAddedMessage ? 'checkmark-white.png' : 'buy-again.png'}`}
        />
        <span className='buy-again-message'>
          {displayAddedMessage ? 'Added' : 'Add to Cart'}
        </span>
      </button>
      {errorMessage && (
        <div
          className='order-details-error'
          style={{ marginTop: 6, color: 'red', fontSize: 13 }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
