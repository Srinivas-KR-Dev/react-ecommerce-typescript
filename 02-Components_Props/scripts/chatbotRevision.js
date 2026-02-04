function ChatInput({ chatMessages, setchatMessages }) {

    const [inputText, setInputText] = React.useState('');

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    function sendMessageOnKeyDown(event) {
        if (event.key === 'Enter') {
            sendMessage();
        } else if (event.key === 'Escape') {
            setInputText('');

        }

    }

    async function sendMessage() {

        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: "user",
                key: crypto.randomUUID()
            }

        ]

        setInputText('');

        setchatMessages(newChatMessages);

        const response = await Chatbot.getResponseAsync(inputText);

        setchatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: "robot",
                key: crypto.randomUUID()
            }
        ]);

    }

    return (
        <p>
            <input
                placeholder="Send a meesage to Chatbot"
                size="30"
                onChange={saveInputText}
                onKeyDown={sendMessageOnKeyDown}
                value={inputText}
            />
            <button onClick={sendMessage}>Send</button>
        </p>
    );

}

function ChatMessage({ message, sender }) {



    return (
        <p>
            {sender === 'robot' && (
                <img src="images/robot.png" alt="robot" width="50" height="50" />
            )}
            {message}
            {sender === 'user' && (
                <img src="images/user.png" alt="user" width="50" height="50" />
            )}
        </p>
    );

}

function ChatMessages({ chatMessages }) {

    return (

        chatMessages.map((chatMessage) => {
            return (
                <ChatMessage
                    message={chatMessage.message}
                    sender={chatMessage.sender}
                    key={chatMessage.key}
                />
            );
        })
    );
}


function App() {

    const [chatMessages, setchatMessages] = React.useState([]);

    return (
        <>
            <ChatInput
                chatMessages={chatMessages}
                setchatMessages={setchatMessages}
            />
            <ChatMessages
                chatMessages={chatMessages}
            />
        </>

    );
}


const container = document.querySelector('.js-container');

const root = ReactDOM.createRoot(container);

root.render(<App />);