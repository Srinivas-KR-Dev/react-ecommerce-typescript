function ChatInput(){

    return (
        <p>
            <input 
                placeholder="Send a meesage to Chatbot" 
                size="30"
            />
            <button>Send</button>
        </p>
    );

}

function ChatMessage({message, sender}) {

    /* const message = props.message
    const sender = props.sender */

   /*  const {message, sender} = props; */
     

  /*   if(sender  === 'robot') {

        return(
            <>
                <img src="images/robot.png" alt="robot" width="50" height="50" />
                {message}
            </>
        );
    } */
    
    return (
        <p>
            {sender  === 'robot' && (
                <img src="images/robot.png" alt="robot" width="50" height="50" />  
            )}
            {message}
            {sender  === 'user' && (
                <img src="images/user.png" alt="user" width="50" height="50" />
            )}
        </p>
    );
    
}

const container = document.querySelector('.js-container')


/* const app = //{ <section>{ChatInput()}</section> }// */

function App () {

    return(
        <>
            <ChatInput />
            <ChatMessage 
                message="hello chatbot" 
                sender="user" 
            />
            <ChatMessage 
                message="Hello! How can I help you?" sender="robot" 
            />
            <ChatMessage 
                message="today date" 
                sender="user" 
            />
            <ChatMessage 
                message="Today is October 27" 
                sender="robot" 
            />
        </>
        
    );
}


/*  const app = (
                <>
                    <ChatInput />
                    <ChatMessage 
                        message="hello chatbot" 
                        sender="user" 
                    />
                    <ChatMessage 
                        message="Hello! How can I help you?" sender="robot" 
                    />
                    <ChatMessage 
                        message="today date" 
                        sender="user" 
                    />
                    <ChatMessage 
                        message="Today is October 27" 
                        sender="robot" 
                    />
                </>
        ) */




ReactDOM.createRoot(container).render(<App />);