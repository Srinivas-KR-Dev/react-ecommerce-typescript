import Header from '../components/Header';
import './NotFoundPage.css';

function NotFoundPage(){

    return (

        <>
           <title>404 Page Not Found</title>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

            <Header />

            <p className="not-found-message">Page not Found</p>

        </>
    );
    
}

export default NotFoundPage;