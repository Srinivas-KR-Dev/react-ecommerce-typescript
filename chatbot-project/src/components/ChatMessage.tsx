import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/profile-1.jpg';
import './ChatMessage.css';
import dayjs from 'dayjs';

type ChatMessageProps = {
    message : string,
    sender: string,
    time: number
};

function ChatMessage({message, sender, time} : ChatMessageProps) {

    
    return (
        <div className={
            sender  === 'user'? 
                'chat-message-user': 
                'chat-message-robot'
        }>
            {sender  === 'robot' && (
                <img 
                    src={RobotProfileImage}
                    alt="robot" 
                    width="45" 
                    height="45" 
                    className="chat-message-profile"
                />  
            )}
            <div className="chat-message-text">
                {message}
            {/* The "time && (" check is optional. I added it just to be safe. */}
            {time && (
            <div className='chat-message-time'>
                {dayjs(time).format('h:mma')}
            </div>
            )}
            </div>
            
            {sender  === 'user' && (
                <img 
                    src={UserProfileImage} 
                    alt="user" 
                    width="45" 
                    height="45" 
                    className="chat-message-profile"
                />
            )}
        </div>
    );
    
}

export default ChatMessage;

