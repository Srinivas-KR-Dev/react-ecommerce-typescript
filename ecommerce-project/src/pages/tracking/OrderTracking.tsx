import dayjs from "dayjs";
import { Link } from "react-router";
import type { Order } from "../../types/orders";

type OrderTrackingProps = {
    order: Order;
    productId: string;
}


function OrderTracking({ order, productId }: OrderTrackingProps) {


    const orderProduct = order.products.find((orderProduct) => {
        return orderProduct.productId === productId;
    })!;

    const totalDeliveryTimeMs = orderProduct
        .estimatedDeliveryTimeMs - order.orderTimeMs;

    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

    let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;

    if (deliveryPercent > 100) {

        deliveryPercent = 100;

    }

    /* deliveryPercent = Math.min(deliveryPercent, 100) */


    const isPreparing = deliveryPercent < 33;
    const isShipped = deliveryPercent >= 33 && deliveryPercent < 100
    const isDelivered = deliveryPercent === 100;


    return (
        <div className="order-tracking">
            <Link className="back-to-orders-link link-primary" to="/orders">
                View all orders
            </Link>

            <div className="delivery-date">
                {(deliveryPercent >= 100) ? 'Delivered on' : 'Arriving on'} {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div className="product-info">
                {orderProduct.product.name}
            </div>

            <div className="product-info">
                Quantity: {orderProduct.quantity}
            </div>

            <img className="product-image" src={orderProduct.product.image} />

            <div className="progress-labels-container">
                <div className={`progress-label ${isPreparing && 'current-status'}`}>
                    Preparing
                </div>
                <div className={`progress-label ${isShipped && 'current-status'}`}>
                    Shipped
                </div>
                <div className={`progress-label ${isDelivered && 'current-status'}`}>
                    Delivered
                </div>
            </div>

            <div className="progress-bar-container">
                <div className="progress-bar" style={{
                    width: `${deliveryPercent}%`
                }}></div>
            </div>
        </div>
    );
}

export default OrderTracking;