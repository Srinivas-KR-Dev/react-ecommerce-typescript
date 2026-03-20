import CheckoutHeader from './CheckoutHeader';
import OrderSummary from './OrderSummary';
import PaymentSummary from './PaymentSummary';
import './CheckoutPage.css';
import {
  useGetCartItems,
  useGetDeliveryOptions,
  useGetPaymentSummary,
} from '../../hooks/useApi';

export function CheckoutPage() {
  const { data: cart = [] } = useGetCartItems();
  const { data: deliveryOptions = [] } = useGetDeliveryOptions();
  const { data: paymentSummary } = useGetPaymentSummary(cart);

  return (
    <>
      <title>Checkout</title>
      <link rel='icon' href='cart-favicon.png' type='image/png' />
      <CheckoutHeader cart={cart} />
      <div className='checkout-page'>
        <div className='page-title'>Review your order</div>
        <div className='checkout-grid'>
          <OrderSummary deliveryOptions={deliveryOptions} cart={cart} />
          {paymentSummary && <PaymentSummary paymentSummary={paymentSummary} />}
        </div>
      </div>
    </>
  );
}
