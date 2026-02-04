function ChatInput({ chatMessages, setChatMessages }) {



    const [inputText, setInputText] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);


    function saveInputText(event) {
        setInputText(event.target.value);
    }

    async function sendMessage() {

        if (isLoading || inputText === '') {
            return;
        }

        setIsLoading(true);

        const newChatMessages = [...chatMessages,
        {
            message: inputText,
            sender: 'user',
            id: crypto.randomUUID()
        }


        ];

        /* setChatMessages(newChatMessages); */

        setInputText('');


        setChatMessages([
            ...newChatMessages,

            {

                message: <img src="images/loading-spinner.gif"
                    className="loading-image"
                    alt="loading"
                    width="45"
                    height="45" />,
                sender: 'robot',
                id: crypto.randomUUID()
            }

        ]);

        const response = await Chatbot.getResponseAsync(inputText);

        setChatMessages([
            ...newChatMessages,
            {

                message: response,
                sender: 'robot',
                id: crypto.randomUUID()
            }

        ]);

        /* setInputText(''); */

        setIsLoading(false);

    }

    function handleKeyDown(event) {

        if (event.key === 'Enter') {
            sendMessage();
        } else if (event.key === 'Escape') {
            setInputText('');
        }
    }


    return (
        <div className="chat-input-container">
            <input
                placeholder="Send a meesage to Chatbot"
                size="30"
                onChange={saveInputText}
                onKeyDown={handleKeyDown}
                value={inputText}
                className="chat-input"
            />
            <button
                onClick={sendMessage}
                className="send-button"
            >Send</button>

        </div>
    );

}

function ChatMessage({ message, sender }) {


    return (
        <div className={
            sender === 'user' ?
                'chat-message-user' :
                'chat-message-robot'
        }>
            {sender === 'robot' && (
                <img
                    src="images/robot.png"
                    alt="robot"
                    width="45"
                    height="45"
                    className="chat-message-profile"
                />
            )}
            <div className="chat-message-text">
                {message}
            </div>
            {sender === 'user' && (
                <img
                    src="images/user.png"
                    alt="user"
                    width="45"
                    height="45"
                    className="chat-message-profile"
                />
            )}
        </div>
    );

}

// To use a function as a hook, the function name must
// start with "use".
function useAutoScroll(dependencies) {
    // It's highly recommend to rename this to something
    // more generic like containerRef. This will make the
    // code make more sense if we ever reuse this code in
    // other components.
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        const containerElem = containerRef.current;

        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, dependencies);

    return containerRef;

}



/* const app = //{ <section>{ChatInput()}</section> }// */

function ChatMessages({ chatMessages }) {


    const chatMessageRef = useAutoScroll([chatMessages]);

    console.log(chatMessageRef)
    /* const chatMessageRef = React.useRef(null);
    */
    /* React.useEffect(()=> {
      const containerElem =  chatMessageRef.current;
      if(containerElem) {
          
          containerElem.scrollTop = containerElem.scrollHeight;
          
      }
  },[chatMessages]); */


    return (

        <div className="chat-message-container"
            ref={chatMessageRef}>

            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessage
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        key={chatMessage.id}
                    />

                );

            })}

        </div>
    );

}

function App() {

    const [chatMessages, setChatMessages] = React.useState([])



    return (
        <section className="app-container">

            {chatMessages.length === 0 &&
                <p className="welcome-message">Welcome to the chatbot project! Send a message using the textbox below.</p>
            }

            <ChatMessages
                chatMessages={chatMessages}
            />

            <ChatInput
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
            />

            {/* <p className="position-switcher-container">
                <a className="position-switcher" href="#" onClick={console.log('clicked')}>Move textbox to top</a>
            </p> */}
        </section>
    );
}

const container = document.querySelector('.js-container');

ReactDOM.createRoot(container).render(<App />);



