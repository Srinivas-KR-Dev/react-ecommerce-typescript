


function App() {

    const [isButtonOn, setIsButtonOn] =  React.useState(true);


    /* function switchButtonOn() {
        /* if (isButtonOn) {
            setIsButtonOn(false);
        } else {
            setIsButtonOn(true);

        } */

      /*  setIsButtonOn(!isButtonOn);
    } */



    return (
        <button 
            className={isButtonOn ? 'on-buttoon' : 'off-buttoon'} 
            /* onClick={switchButtonOn} */
            onClick={() => setIsButtonOn(!isButtonOn)}
        >   
            {isButtonOn ? 'ON' : 'OFF'}
        </button>
    );
}





const conatiner = document.querySelector('.js-container');

ReactDOM.createRoot(conatiner).render(<App />);