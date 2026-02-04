import React, { useState } from 'react';
import  dayjs  from 'dayjs';
import { Chatbot } from 'supersimpledev';
import LoaidngSpinnerImage from '../assets/loading-spinner.gif';
import './ChatInput.css'


type Message = {
        message: string | React.ReactNode,
        sender: string,
        id: string,
        time?: number;
    };

type ChatInputProps = {
    chatMessages : Message [];
    setChatMessages: (chatMessages: Message []) => void;
};

function ChatInput({chatMessages, setChatMessages} : ChatInputProps) {


    const [inputText, setInputText] = useState('');

    const [isLoading, setIsLoading] = useState(false);
   

    function saveInputText(event : React.ChangeEvent<HTMLInputElement>) {
        setInputText(event.target.value);
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
                id: crypto.randomUUID(),
                time: dayjs().valueOf()
            }

          
        ];
        
        /* setChatMessages(newChatMessages); */

        setInputText('');

      
        setChatMessages([
            ...newChatMessages,
          
            {   
                message: <img  src={LoaidngSpinnerImage}
                className="loading-image"
                alt="loading" 
                width="45" 
                height="45"/>,
                sender:'robot',
                id: crypto.randomUUID(),
            }

        ]);

       


        const response = await Chatbot.getResponseAsync(inputText);

       
        setChatMessages([
            ...newChatMessages,
            {   

                message:response,
                sender:'robot',
                id: crypto.randomUUID(),
                time: dayjs().valueOf()
            }

        ]);

       /* setInputText(''); */

       setIsLoading(false);
   
    }

    function handleKeyDown(event:React.KeyboardEvent<HTMLInputElement>) {

        if(event.key === 'Enter') {
            sendMessage();
        } else if (event.key === 'Escape') {
             setInputText('');
        }  
    }

    function clearMessages() {

        setChatMessages([]);
        

        // Here, you could also run:
        // localStorage.setItem('messages', JSON.stringify([]));
        // However, because chatMessages is being updated, the
        // useEffect in the App component will run, and it will
        // automatically update messages in localStorage to be [].
      

    }
     

    return (
        <div className="chat-input-container">
            <input 
                placeholder="Send a message to Chatbot" 
                size= {30}
                onChange={saveInputText}
                onKeyDown={handleKeyDown}
                value= {inputText}  
                className="chat-input"
            />
            <button 
                onClick={sendMessage}
                className="send-button"
            >Send</button>

            <button 
                onClick={clearMessages}
                className="clear-button"
            >Clear</button>
            
        </div>
    );

}

export default ChatInput;