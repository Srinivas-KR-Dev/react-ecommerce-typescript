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
  const { data: cart = [], isLoading: isCartLoading } = useGetCartItems();
  const { data: deliveryOptions = [], isLoading: isDeliveryOptionsLoading } =
    useGetDeliveryOptions();
  const { data: paymentSummary, isLoading: isPaymentSummaryLoading } =
    useGetPaymentSummary(cart);

  const isLoading =
    isCartLoading || isDeliveryOptionsLoading || isPaymentSummaryLoading;

  return (
    <>
      <title>Checkout</title>
      <link rel='icon' href='cart-favicon.png' type='image/png' />
      <CheckoutHeader cart={cart} />
      <div className='checkout-page'>
        <div className='page-title'>Review your order</div>
        {isLoading ? (
          <div className='checkout-loading' data-testid='checkout-loading'>
            Loading checkout...
          </div>
        ) : (
          <div className='checkout-grid'>
            <OrderSummary deliveryOptions={deliveryOptions} cart={cart} />
            {paymentSummary && <PaymentSummary paymentSummary={paymentSummary} />}
          </div>
        )}
      </div>
    </>
  );
}
