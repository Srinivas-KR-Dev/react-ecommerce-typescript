import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import axios from 'axios';
import Header from '../../components/Header';
import ProductsGrid from './ProductsGrid';
import type { Cart, LoadCart } from '../../types/cart';
import './HomePage.css';
import type { Product } from '../../types/product';

type HomePageProps = {
    cart: Cart;
    loadCart: LoadCart;
};

export function HomePage({ cart, loadCart }: HomePageProps) {

    const [products, setProducts] = useState<Product[]>([]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');

    useEffect(() => {

        const fetchHomeData = async () => {
            const urlPath = search ? `/api/products?search=${search}` :
                '/api/products';

            const response = await axios.get(urlPath);

            setProducts(response.data);
        }
        fetchHomeData();

    }, [search]);

    return (

        <>
            <title>Ecommerce Project</title>

            <link rel="icon" href="home-favicon.png" type="image/png" />

            <Header cart={cart} />

            <div className="home-page"
                data-testid="home-page"
            >
                <ProductsGrid products={products} loadCart={loadCart} />

            </div>
        </>
    );
}

