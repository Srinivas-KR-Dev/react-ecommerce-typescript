import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import OrderGrid from './OrderGrid';
import './OrdersPage.css';
import type { Cart, LoadCart } from '../../types/cart';
import type { Orders } from '../../types/orders';

type OrdersPageProps = {
    cart: Cart;
    loadCart: LoadCart;
}

export function OrdersPage({ cart, loadCart }: OrdersPageProps) {

    const [orders, setOrders] = useState<Orders>([]);

    useEffect(() => {

        /* axios.get('/api/orders?expand=products')
        .then((response)=>{

            setOrders(response.data);

        }) */

        const fetchOrdersData = async () => {
            const response = await axios.get('/api/orders?expand=products');
            setOrders(response.data);
        }
        fetchOrdersData();
    }, []);

    return (

        <>
            <title>Orders</title>

            <link rel="icon" href="orders-favicon.png" type="image/png" />

            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>
                <OrderGrid orders={orders} loadCart={loadCart} />
            </div>
        </>
    );
}