import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import ProductsGrid from './ProductsGrid';
import './HomePage.css';




export function HomePage( {cart} ) {

    const [products, setProducts] = useState([]);
    

    useEffect(()=>{


        const fetchHomeData = async () => {

            const response =  await axios.get('/api/products')

            setProducts(response.data);


        }

     
        fetchHomeData();

    }, []);


    /* fetch('http://localhost:3000/api/products')
        .then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(data);
    }) */
       

    return (

        <>
            <title>Ecommerce Project</title>

            <link rel="icon" href="home-favicon.png" type="image/png"/>

            <Header cart={cart} />

            <div className="home-page">

                <ProductsGrid products={products} />

            </div>

        </>


    );
}