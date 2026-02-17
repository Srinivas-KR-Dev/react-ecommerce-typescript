import Header from '../components/Header';
import type { Cart } from '../types/cart';
import './NotFoundPage.css';

type NotFoundPageProps = {
    cart: Cart;
};

function NotFoundPage({ cart }: NotFoundPageProps) {

    return (

        <>
            <title>404 Page Not Found</title>

            <link rel="icon" href="home-favicon.png" type="image/png" />

            <Header cart={cart} />

            <section className="not-found-message">
                <h1>🚫404</h1>
                <p className="not-found-message__p">Page Not Found</p>
            </section>

        </>
    );

}

export default NotFoundPage;