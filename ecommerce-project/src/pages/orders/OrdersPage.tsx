import Header from '../../components/Header';
import OrderGrid from './OrderGrid';
import './OrdersPage.css';
import { useGetCartItems, useGetOrders } from '../../hooks/useApi';

export function OrdersPage() {
    const { data: cart = [] } = useGetCartItems();
    const { data: orders = [] } = useGetOrders();

    return (
        <>
            <title>Orders</title>
            <link rel="icon" href="orders-favicon.png" type="image/png" />
            <Header cart={cart} />
            <div className="orders-page">
                <div className="page-title">Your Orders</div>
                <OrderGrid orders={orders} />
            </div>
        </>
    );
}