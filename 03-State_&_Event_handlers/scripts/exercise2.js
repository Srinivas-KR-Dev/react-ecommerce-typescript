


function App() {

    const [inputText, setInputText] = React.useState('')

    
    function displayInputText(event) {

         setInputText(event.target.value);

    }

    function resetInputText() {

        setInputText('');

    }

    function setExampleText() {

        setInputText('Jhon');

    }

    return (
        <>
            <input 
                onChange={displayInputText}
                placeholder="Type a name here"
                value = {inputText}
            />

            <button onClick={resetInputText}
            >Reset</button>

            <button onClick={setExampleText}
            >Example</button>
            
            <p>Hello {inputText}</p>
        </>
        
    );
}




const container = document.querySelector('.js-container');

ReactDOM.createRoot(container).render(<App />);