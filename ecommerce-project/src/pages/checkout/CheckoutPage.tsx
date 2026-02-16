import axios from 'axios';
import { useEffect, useState } from 'react';
import CheckoutHeader from './CheckoutHeader';
import OrderSummary from './OrderSummary';
import PaymentSummary from './PaymentSummary';
import './CheckoutPage.css';
import type { Cart, LoadCart } from '../../types/cart';

type CheckoutPageProps = {
    cart: Cart;
    loadCart: LoadCart;
}

export function CheckoutPage({ cart, loadCart }: CheckoutPageProps) {

    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {

        const fetchCheckoutData = async () => {
            const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
            setDeliveryOptions(response.data);
        }
        fetchCheckoutData();
    }, []);

    useEffect(() => {

        const fetchPaymentSummaryData = async () => {
            const response = await axios.get('/api/payment-summary');
            setPaymentSummary(response.data);
        }
        fetchPaymentSummaryData();

    }, [cart])

    return (

        <>
            <title>Checkout</title>
            <link rel="icon" href="cart-favicon.png" type="image/png" />

            <CheckoutHeader cart={cart} />

            <div className="checkout-page">

                <div className="page-title">Review your order</div>

                <div className="checkout-grid">

                    <OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart} />
                    <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />

                </div>
            </div>
        </>
    );
}