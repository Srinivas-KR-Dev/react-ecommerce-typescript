import OrderHeader from "./OrderHeader";
import OrderDetails from "./OrderDetails";
import type { Orders } from "../../types/orders";

type OrderGridProps = {
    orders: Orders;
}

function OrderGrid({ orders }: OrderGridProps) {
    return (
        <div className="orders-grid">
            {orders.map((order) => {
                return (
                    <div key={order.id} className="order-container">
                        <OrderHeader order={order} />
                        <OrderDetails order={order} />

                    </div>

                );
            })}

        </div>
    );
}

export default OrderGrid;