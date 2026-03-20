import { useNavigate } from 'react-router';
import { useCreateOrder } from '../../hooks/useApi';
import type { PaymentSummary as PaymentSummaryType } from '../../types/paymentSummary';
import { formatMoney } from '../../utils/money';

type PaymentSummaryProps = {
  paymentSummary: PaymentSummaryType;
};

function PaymentSummary({ paymentSummary }: PaymentSummaryProps) {
  const navigate = useNavigate();
  const createOrderMutation = useCreateOrder();

  const createOrder = async () => {
    try {
      await createOrderMutation.mutateAsync();
      navigate('/orders');
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  return (
    <div className='payment-summary'>
      <div className='payment-summary-title'>Payment Summary</div>

      {paymentSummary && (
        <>
          <div
            className='payment-summary-row'
            data-testid='payment-summary-product-cost'
          >
            <div>Items ({paymentSummary.totalItems}):</div>
            <div className='payment-summary-money'>
              {formatMoney(paymentSummary.productCostCents)}
            </div>
          </div>

          <div
            className='payment-summary-row'
            data-testid='payment-summary-shipping-cost'
          >
            <div>Shipping &amp; handling:</div>
            <div className='payment-summary-money'>
              {formatMoney(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div
            className='payment-summary-row subtotal-row'
            data-testid='payment-summary-total-before-tax'
          >
            <div>Total before tax:</div>
            <div className='payment-summary-money'>
              {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div
            className='payment-summary-row'
            data-testid='payment-summary-tax'
          >
            <div>Estimated tax (10%):</div>
            <div className='payment-summary-money'>
              {formatMoney(paymentSummary.taxCents)}
            </div>
          </div>

          <div
            className='payment-summary-row total-row'
            data-testid='payment-summary-total'
          >
            <div>Order total:</div>
            <div className='payment-summary-money'>
              {formatMoney(paymentSummary.totalCostCents)}
            </div>
          </div>

          <button
            className='place-order-button button-primary'
            data-testid='place-order-button'
            onClick={createOrder}
            disabled={createOrderMutation.isPending}
          >
            {createOrderMutation.isPending
              ? 'Placing order...'
              : 'Place your order'}
          </button>
        </>
      )}
    </div>
  );
}

export default PaymentSummary;
