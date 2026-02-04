
const button = <button>hello</button>;
const paragraph = <p>paragraph of text</p>;
const section = (
    <section>
        <button>hello</button>
        <p>paragraph of text {2 + 2}</p>
    </section>
);

const container = document.querySelector('.js-container');
/* ReactDOM.createRoot(container).render('Welcome to SuperSimpleDev React Course'); */
ReactDOM.createRoot(container).render(section);