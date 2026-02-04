

function App() {

    const [count, setCount] = React.useState(0);
    const buttonRef = React.useRef(null);
    const intervelRef = React.useRef(null);

    function setCountDown() {

        /* setCount(count + 1); */

        setCount((count) => count + 1);
    }


    function resetCountDown() {

        setCount(0);
        clearInterval(intervelRef.current);


    }



    function setAutoClick() {


        if (intervelRef.current) return;

        intervelRef.current = setInterval(() => {
            const buttonElem = buttonRef.current;

            if (buttonElem) {
                buttonElem.click();
            }
        }, 1000);

    }


    /*    function setAutoClick() {
      
    
              setInterval(() => {
                   setCount(count => count + 1);
              }, 1000);       
      
      }    */





    return (

        <section className="button-container">

            <button
                onClick={setCountDown}
                ref={buttonRef}
                className="counter-button"
            >
                Clicked {count} {(count === 1) ? 'time' : 'times'}
            </button>

            <button
                onClick={resetCountDown
                        /* () => setCount(0) */}
                className="counter-button"
            >
                Reset
            </button>

            <button
                onClick={setAutoClick}
                className="counter-button"
            >
                Auto Click
            </button>

        </section>
    );
}

const container = document.querySelector('.js-container');

ReactDOM.createRoot(container).render(<App />);


/* 
let isAutoPlaying = false;
let intervalId;
const autoButtonElement =  document.querySelector('.js-auto-button');

function playAuto() {
    if(!isAutoPlaying) {
        intervalId = setInterval(function(){
            const playerMove = pickComputerMove();
            playGame(playerMove)

        }, 1000);
        isAutoPlaying = true;
        autoButtonElement.innerHTML = 'Stop Play'   
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        autoButtonElement.innerHTML = 'Auto Play'
    }
}
 */