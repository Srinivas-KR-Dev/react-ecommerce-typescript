import axios from 'axios';
import { useState, useEffect} from 'react';
import Header from '../../components/Header';
import OrderGrid from './OrderGrid';
import './OrdersPage.css';





export function OrdersPage ( {cart} ) {

    const [orders, setOrders] = useState([]);



    useEffect(()=>{

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

            <link rel="icon" href="orders-favicon.png" type="image/png"/>

            <Header cart={cart} />

            <div className="orders-page">

                <div className="page-title">Your Orders</div>

                <OrderGrid orders={orders} />

            </div>

        </>
        
    );
}