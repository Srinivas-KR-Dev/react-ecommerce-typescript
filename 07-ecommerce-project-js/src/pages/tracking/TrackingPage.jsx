import { useEffect, useState} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Header from '../../components/Header';
import OrderTracking from './OrderTracking';
import './TrackingPage.css';






export function TrackingPage( { cart }){

    const {orderId, productId} = useParams();

    const [order, setOrder] = useState(null);

    
    useEffect(()=>{

        const fetchTrackingData = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);

            setOrder(response.data);        

        }

        fetchTrackingData();

    }, [orderId]);
    
    

    if (!order) {
    return null;
    } 
   

    return (

        <>
            <title>Tracking</title>

            <link rel="icon" href="tracking-favicon.png" type="image/png"/>

            <Header cart={cart}/>

            <div className="tracking-page">

                <OrderTracking order={order} productId={productId} />

            </div>

        </>

    );

}