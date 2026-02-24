import Header from '../../components/Header';
import OrderGrid from './OrderGrid';
import './OrdersPage.css';
import { useGetOrders } from '../../hooks/useApi';

export function OrdersPage() {
    const { data: orders = [] } = useGetOrders();

    return (
        <>
            <title>Orders</title>
            <link rel="icon" href="orders-favicon.png" type="image/png" />
            <Header />
            <div className="orders-page">
                <div className="page-title">Your Orders</div>
                <OrderGrid orders={orders} />
            </div>
        </>
    );
}