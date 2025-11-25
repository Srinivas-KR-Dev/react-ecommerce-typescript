import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import Header from '../../components/Header';
import OrderDetails from './OrderDetails';
import './OrdersPage.css';





export function OrdersPage ( {cart} ) {

    const [orders, setOrders] = useState([]);


    useEffect(()=>{
        axios.get('/api/orders?expand=products')
        .then((response)=>{

            setOrders(response.data);

        })
    });


    return (

        <>
            <title>Orders</title>

            <link rel="icon" href="orders-favicon.png" type="image/png"/>

            <Header cart={cart} />

            <div className="orders-page">

                <div className="page-title">Your Orders</div>

                <OrderDetails orders={orders} />

            </div>

        </>
        
    );
}