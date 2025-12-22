import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import './ChatMessages.css';


function useAutoScroll(dependency: unknown) {
 
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=> {
        const containerElem =  containerRef.current;
        if(containerElem) {
            
            containerElem.scrollTop = containerElem.scrollHeight;
            
        }
    },[dependency]);

    return containerRef;


}

type ChatMessagesProps = {
    chatMessages : {
        message: string,
        sender: string,
        id: string,
        time: number
    }[]
}

function ChatMessages ({chatMessages} : ChatMessagesProps) {

    
     const chatMessageRef =  useAutoScroll(chatMessages);
     

    return(

        <div className="chat-message-container"
                ref={chatMessageRef}>
            
            {chatMessages.map((chatMessages) => {
                return (
                    <ChatMessage 
                        message = {chatMessages.message} 
                        sender = {chatMessages.sender}
                        key = {chatMessages.id} 
                        time = {chatMessages.time}
                    />

                );

            })}

        </div>
    );

}

export default ChatMessages;