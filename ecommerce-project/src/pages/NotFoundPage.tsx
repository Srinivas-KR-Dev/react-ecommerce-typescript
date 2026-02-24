import Header from '../components/Header';
import './NotFoundPage.css';

function NotFoundPage() {
    return (
        <>
            <title>404 Page Not Found</title>
            <link rel="icon" href="home-favicon.png" type="image/png" />
            <Header />
            <section className="not-found-message">
                <h1>🚫404</h1>
                <p className="not-found-message__p">Page Not Found</p>
            </section>

        </>
    );

}

export default NotFoundPage;