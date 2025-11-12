function ChatInput({chatMessages, setChatMessages}) {



    const [inputText, setInputText] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
   

    function saveInputText(event) {
        setInputText(event.target.value);
        //console.log(event.target.value) 
        
    }

  

   async function sendMessage() {

        if( isLoading || inputText === '') {
            return;
        }

        setIsLoading(true);

        const newChatMessages = [...chatMessages,
            {
                message:inputText,
                sender:'user',
                id: crypto.randomUUID()
            }

             // Another solution is to add the Loading... message
            // to newChatMessages, but we have to remove it later.
            /* {
              message: 'Loading...',
              sender: 'robot',
              id: crypto.randomUUID()
            } */
        ];
        
        /* setChatMessages(newChatMessages); */

        // We can put this at the top of the function or
        // after the first setChatMessages(). Both work.
        setInputText('');

        // This creates a temporary Loading... message.
        // Because we don't save this message in newChatMessages,
        // it will be remove later, when we add the response
        setChatMessages([
            ...newChatMessages,
            // This makes a copy of newChatMessages, but without the
            // last message in the array.
            //...newChatMessages.slice(0, newChatMessages.length - 1)
            {   

                message:'loading..',
                sender:'robot',
                id: crypto.randomUUID()
            }

        ]);


        const response = await Chatbot.getResponseAsync(inputText);

       
        setChatMessages([
            ...newChatMessages,
            {   

                message:response,
                sender:'robot',
                id: crypto.randomUUID()
            }

        ]);

       /* setInputText(''); */

       setIsLoading(false);
   
    }

    function handleKeyDown(event) {

        if(event.key === 'Enter') {
            sendMessage();
        } else if (event.key === 'Escape') {
             setInputText('');
        }  
    }
     

    return (
        <div>
            <input 
                placeholder="Send a meesage to Chatbot" 
                size="30"
                onChange={saveInputText}
                onKeyDown={handleKeyDown}
                value= {inputText}  
            />
            <button 
                onClick={sendMessage}
            >Send</button>
        </div>
    );

}

function ChatMessage({message, sender}) {

    
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




/* const app = //{ <section>{ChatInput()}</section> }// */

function ChatMessages ({chatMessages}) {

    /* const [chatMessages, setChatMessages] = React.useState([{
        message: 'hello chatbot',
        sender:'user',
        id: 'id1'
    }, {   
        message:'Hello! How can I help you?',
        sender:'robot',
        id: 'id2'
        
    }, {
        message:'today date',
        sender:'user',
        id: 'id3'

    }, {
        message:'Today is October 27',
        sender:'robot',
        id: 'id4'

    }]) */

    //const chatMessages = array[0];
    //const setChatMessages = array[1]; //also known as updater funxtion 

    //const [chatMessages, setChatMessages] = array
    

   /*  function sendMessage() {

        setChatMessages([
            ...chatMessages,
            {
                message:'test',
                sender:'user',
                id: crypto.randomUUID()
            }

        ]);
        
    } */
 
    return(

        <>
            {/* <button onClick={sendMessage}>send message</button> */}
            {chatMessages.map((chatMessages) => {
                return (
                    <ChatMessage 
                        message = {chatMessages.message} 
                        sender = {chatMessages.sender}
                        key = {chatMessages.id} 
                    />

                );

            })}

        </>
    );

}

function App () {

    const [chatMessages, setChatMessages] = React.useState([{
        message: 'hello chatbot',
        sender:'user',
        id: 'id1'
    }, {   
        message:'Hello! How can I help you?',
        sender:'robot',
        id: 'id2'
        
    }, {
        message:'today date',
        sender:'user',
        id: 'id3'

    }, {
        message:'Today is October 27',
        sender:'robot',
        id: 'id4'

    }])
    
    return (
        <>
            <ChatInput 
                chatMessages= {chatMessages} 
                setChatMessages={setChatMessages} 
            />
            <ChatMessages 
                chatMessages= {chatMessages} 
            />
        </>       
    );
}

const container = document.querySelector('.js-container');

ReactDOM.createRoot(container).render(<App />);








/* const array1 = [1, 2, 3, 4, 5];

console.log(array1.length -1)



console.log(array1.slice(0,array1.length -1))
 */



/*  message: inputText,
              sender: 'user',
              id: crypto.randomUUID()
            },
            // Another solution is to add the Loading... message
            // to newChatMessages, but we have to remove it later.
            {
              message: 'Loading...',
              sender: 'robot',
              id: crypto.randomUUID()
            }
          ];

          setChatMessages(newChatMessages);
          // We can put this here or at the top of this function
          // (clear the textbox immediately after clicking Send).
          // Both solutions work.
          setInputText('');

          const response = await Chatbot.getResponseAsync(inputText);
          setChatMessages([
            ...newChatMessages,
            // This makes a copy of newChatMessages, but without the
            // last message in the array.
            ...newChatMessages.slice(0, newChatMessages.length - 1),
            {
              message: response,
              sender: 'robot',
              id: crypto.randomUUID()
            }
          ]);

          setInputText('');
        } */

      