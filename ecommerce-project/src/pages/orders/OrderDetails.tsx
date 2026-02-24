import { Link } from "react-router";
import { Fragment, useState } from "react";
import dayjs from "dayjs";
import type { Order } from "../../types/orders";
import { useAddToCart } from "../../hooks/useApi";

type OrderDetailsProps = {
    order: Order;
}

function OrderDetails({ order }: OrderDetailsProps) {
    const [displayAddedMessage, setDisplayAddedMessage] = useState(false);
    const addToCartMutation = useAddToCart();

    return (

        <div className="order-details-grid">

            {order.products.map((orderProduct) => {

                const addToCart = async () => {
                    try {
                        await addToCartMutation.mutateAsync({
                            productId: orderProduct.product.id,
                            quantity: 1,
                        });
                        setDisplayAddedMessage(true);
                        setTimeout(() => {
                            setDisplayAddedMessage(false);
                        }, 2000);
                    } catch (error) {
                        console.error('Failed to add to cart:', error);
                    }
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