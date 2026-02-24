import { useParams } from 'react-router';
import Header from '../../components/Header';
import OrderTracking from './OrderTracking';
import './TrackingPage.css';
import { useGetCartItems, useGetOrderById } from '../../hooks/useApi';

export function TrackingPage() {
    const { orderId, productId } = useParams();
    const { data: cart = [] } = useGetCartItems();
    const { data: order, isLoading } = useGetOrderById(orderId);

    if (isLoading || !order) {
        return null;
    }


    return (
        <>
            <title>Tracking</title>
            <link rel="icon" href="tracking-favicon.png" type="image/png" />
            <Header cart={cart} />
            <div className="tracking-page">
                {productId && order && <OrderTracking order={order} productId={productId} />}
            </div>
        </>
    );
}