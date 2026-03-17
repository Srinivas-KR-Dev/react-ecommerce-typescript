import { useSearchParams } from 'react-router';
import Header from '../../components/Header';
import ProductsGrid from './ProductsGrid';
import { useGetProducts } from '../../hooks/useApi';
import './HomePage.css';

export function HomePage() {
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || undefined;

    const { data: products = [] } = useGetProducts(search);

    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" href="home-favicon.png" type="image/png" />
            <Header />
            <div className="home-page" data-testid="home-page">
                <ProductsGrid products={products} />
            </div>
        </>
    );
}

