import OrderHeader from "./OrderHeader";
import OrderDetails from "./OrderDetails";
import type { LoadCart } from "../../types/cart";
import type { Orders } from "../../types/orders";


type OrderGridProps = {
    orders: Orders;
    loadCart: LoadCart;
}


function OrderGrid({ orders, loadCart }: OrderGridProps) {

    return (

        <div className="orders-grid">

            {orders.map((order) => {

                return (
                    <div key={order.id} className="order-container">

                        <OrderHeader order={order} />

                        <OrderDetails order={order} loadCart={loadCart} />

                    </div>

                );
            })}

        </div>
    );
}

export default OrderGrid;