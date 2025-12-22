import { useEffect, useState } from 'react';
import { Chatbot } from 'supersimpledev';
import  dayjs  from 'dayjs';
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages'
import './App.css';
import RobotProfileImage from './assets/robot.png';




function App () {
    
    const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('saveMessages')!) || [])

    
    useEffect(()=>{

        /* const responses = {
            'what Is Your Name': 'ChatBot',
            'good Afternoon' : 'Good Afternoon',
            'what Is Tomorrows Date': dayjs().add(1, 'day').format('dddd, MMM D'),
            'goodbye': 'Goodbye. Have a great day!',
            'Can you give me a unique id':()=>`Sure here it is ${crypto.randomUUID()}`    
           
        } */
        
        Chatbot.addResponses({

            'what Is Your Name': 'ChatBot',
            'good Afternoon' : 'Good Afternoon',
            'what Is Tomorrows Date': dayjs().add(1, 'day').format('dddd, MMM D'),
            'goodbye': 'Goodbye. Have a great day!',
            'give me a unique id':()=>`Sure! Here's a unique ID: ${crypto.randomUUID()}` 
               
           
            });
        
        // [] tells useEffect to only run once. We only want to run
        // this setup code once because we only want to add these
        // extra responses once.

        },[])

    useEffect(()=>{

            

        localStorage.setItem('saveMessages', JSON.stringify(chatMessages))

            
    }, [chatMessages]);

    const title = `${chatMessages.length} Messages` 

    return (
        <>
            <title>{ chatMessages.length === 0 ? 'Chatbot Project' : title }</title>

            <link rel="icon" href={RobotProfileImage} type="image/png"/>

            <div className="app-container">

                {chatMessages.length === 0 && 
                <p className="welcome-message">Welcome to the chatbot project! Send a message using the textbox below.</p>
                }

                <ChatMessages 
                    chatMessages= {chatMessages} 
                />

                <ChatInput 
                    chatMessages= {chatMessages} 
                    setChatMessages={setChatMessages} 
                />
                
                {/* <p className="position-switcher-container">
                    <a className="position-switcher" href="#" onClick={console.log('clicked')}>Move textbox to top</a>
                </p> */}
            </div> 

        </>     
    );
}

export default App
