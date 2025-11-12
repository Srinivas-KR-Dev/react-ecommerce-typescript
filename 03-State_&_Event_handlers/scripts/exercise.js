

function Counter({ count, setCount }) {

    function increaseCount() {

        setCount(count + 1);
        
    }

    return (
      

        <button onClick={increaseCount}>

            Clicked {count} {(count === 1) ? 'time' : 'times'}
            
        </button>

      
    );

}

function Reset({setCount}) {

    function reset() {
        setCount(0);

    }
    
    return (
        <button onClick={reset}
        
        >Reset</button>
    )

}

function App() {

    const [count, setCount] = React.useState(0);


    return (
        <>

            <Counter 
                count = {count} 
                setCount = {setCount}
            />

            <Counter 
                count = {count} 
                setCount = {setCount} 
            />

            <Reset
                setCount = {setCount}
            />

        </>

    )
}

const container = document.querySelector('.js-container');

ReactDOM.createRoot(container).render(<App />);
