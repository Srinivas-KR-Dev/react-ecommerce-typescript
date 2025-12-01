import axios from "axios";
import { Link } from "react-router";
import { Fragment, useState } from "react";
import dayjs from "dayjs";







function OrderDetails( {order, loadCart} ) {

    const [displayAddedMessage, setDisplayAddedMessage] = useState(false);

    return(

        <div className="order-details-grid">
                                
            {order.products.map((orderProduct)=>{

                const addToCart = async () => {
                        await axios.post('/api/cart-items', {
                            productId: orderProduct.product.id,
                            quantity: 1
                        })


                        await loadCart();

                        setDisplayAddedMessage(true);

                        setTimeout(()=>{

                             setDisplayAddedMessage(false);

                        },2000);
                    }

                return (

                <Fragment key={orderProduct.product.id}>

                    <div className="product-image-container">
                        <img src={orderProduct.product.image} />
                        </div>

                        <div className="product-details">
                        <div className="product-name">
                            {orderProduct.product.name}
                        </div>
                        <div className="product-delivery-date">
                            Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                        </div>
                        <div className="product-quantity">
                            Quantity: {orderProduct.quantity}
                        </div>
                        <button className="buy-again-button button-primary" 
                            onClick={addToCart}
                        >
                            {<img className="buy-again-icon" src={`images/icons/${displayAddedMessage ? 'checkmark-white.png' : 'buy-again.png'}`} />}
                            <span className="buy-again-message"       
                            >{displayAddedMessage ? 'Added' : 'Add to Cart'}</span>
                        </button>
                        </div>

                        <div className="product-actions">
                        <Link to={`/tracking/${order.id}/${orderProduct.product.id}`}>
                            <button className="track-package-button button-secondary">
                            Track package
                            </button>
                        </Link>
                    </div>

                </Fragment>               
                );
            })}
                                
        </div>
    );
}

export default OrderDetails;