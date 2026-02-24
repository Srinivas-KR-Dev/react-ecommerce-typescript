import { useSearchParams } from 'react-router';
import Header from '../../components/Header';
import ProductsGrid from './ProductsGrid';
import { useGetCartItems, useGetProducts } from '../../hooks/useApi';
import './HomePage.css';

export function HomePage() {
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || undefined;

    const { data: products = [] } = useGetProducts(search);
    const { data: cart = [] } = useGetCartItems();

    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" href="home-favicon.png" type="image/png" />
            <Header cart={cart} />
            <div className="home-page" data-testid="home-page">
                <ProductsGrid products={products} />
            </div>
        </>
    );
}

