import OrderHeader from "./OrderHeader";
import OrderDetails from "./OrderDetails";





function OrderGrid( { orders } ) {

    return (

        <div className="orders-grid">

            {orders.map((order) => {

                    return(
                        <div key={order.id} className="order-container">

                            <OrderHeader order={order} />

                            <OrderDetails order={order} / >

                        </div>

                );})}

            </div>
    );
}

export default OrderGrid;