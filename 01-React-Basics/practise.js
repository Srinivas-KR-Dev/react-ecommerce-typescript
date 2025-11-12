const container = document.querySelector('.js-main');

const button = <button>Good job!</button>;

const paragraph = <p>My name is Srinivas</p>;

const section = (
            <section>
                <p>Cotton socks</p>
                <p>Price: $10</p>
                <button>Add to Cart</button>
            </section>
        );



const productCost = 10 + 8 * 2;/* (1000 + 800 * 2) / 100; */

const shippingCost = 5;

console.log(productCost);

const productParagraph = <p>Product cost: ${productCost}</p>

const secton2 = (
    <section>
        <p>Product cost: ${productCost}</p>
        <p>Shipping cost: ${shippingCost}</p>
        <p>Total cost: ${productCost + shippingCost}</p>
        <button>Place your order</button>
    </section>

)

const todaysDate = dayjs().format('MMMM D');

const paragraph2 = <p>Today is {todaysDate}</p>
const paragraph3 = <p>Current time: {dayjs().format('HH:mm:ss')}</p>



/* ReactDOM.createRoot(container).render(paragraph3); */

const root = ReactDOM.createRoot(container);

console.log(dayjs().format('MMMM D'));
console.log(dayjs().add(7,'days').format('MMMM D'));
console.log(dayjs().format('HH:mm:ss'));



setInterval(() => {
    const paragraph = <p>Current time: {dayjs().format('HH:mm:ss')}</p>

    root.render(paragraph);
    
}, 1000);



