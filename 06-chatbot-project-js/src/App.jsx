import { useEffect, useState } from 'react';
import { Chatbot } from 'supersimpledev';
import dayjs from 'dayjs';
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages'
import './App.css';
import RobotProfileImage from './assets/robot.png';

function App() {

    const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || [])


    useEffect(() => {

        /* const responses = {
            'what Is Your Name': 'ChatBot',
            'good Afternoon' : 'Good Afternoon',
            'what Is Tomorrows Date': dayjs().add(1, 'day').format('dddd, MMM D'),
            'goodbye': 'Goodbye. Have a great day!',
            'Can you give me a unique id':()=>`Sure here it is ${crypto.randomUUID()}`    
           
        } */

        Chatbot.addResponses({

            'what is your name': 'ChatBot',
            'hello': 'Hello! 😊',
            'hi': 'Hi there!',
            'how are you': 'I’m doing great! How can I help you today?',
            'good morning': 'Good morning! ☀️',
            'good afternoon': 'Good Afternoon',
            'good evening': 'Good evening!',
            'thank you': 'You’re welcome! 🙌',
            'thanks': 'Happy to help!',
            'goodbye': 'Goodbye. Have a great day!',

            // Date & Time
            'what is today’s date': () =>
                dayjs().format('dddd, MMM D, YYYY'),

            'what day is today': () =>
                dayjs().format('dddd'),

            'what time is it': () =>
                dayjs().format('hh:mm A'),

            'what is tomorrows date': () =>
                dayjs().add(1, 'day').format('dddd, MMM D'),

            'what is yesterday’s date': () =>
                dayjs().subtract(1, 'day').format('dddd, MMM D'),

            'what is the current month': () =>
                dayjs().format('MMMM'),

            // Utilities
            'give me a unique id': () =>
                `Sure! Here's a unique ID: ${crypto.randomUUID()}`,

            'generate uuid': () =>
                `Here you go: ${crypto.randomUUID()}`,

            'generate random number': () =>
                `Random number: ${Math.floor(Math.random() * 1000)}`,

            'generate otp': () =>
                `Your OTP is: ${Math.floor(100000 + Math.random() * 900000)}`,

            'current timestamp': () =>
                `Timestamp: ${Date.now()}`,

            // Fun & Personality
            'tell me a joke':
                'Why do programmers prefer dark mode? Because light attracts bugs 🐛😄',

            'motivate me':
                'Keep going. Every line of code you write makes you better 💪',

            'are you real':
                'As real as your WiFi connection 😄',

            'do you like coding':
                'Absolutely! Especially bug-free code 😉',

            'who created you':
                'I was created by developers who love JavaScript!',

            // Bot Info
            'what can you do':
                'I can answer questions, generate IDs, tell the date & time, and help you with tasks!',

            'help':
                'Try asking: date, time, generate uuid, or tell me a joke',

            'version':
                'ChatBot v1.0.0',

            'who are you':
                'I’m your friendly chatbot 🤖',

            // Fallback
            'default':
                'Sorry, I didn’t understand that. Try asking something else 😊'
        });

        // [] tells useEffect to only run once. We only want to run
        // this setup code once because we only want to add these
        // extra responses once.

    }, [])

    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(chatMessages));

    }, [chatMessages]);

    const title = `${chatMessages.length} Messages`

    return (
        <>
            <title>{chatMessages.length === 0 ? 'Chatbot Project' : title}</title>

            <link rel="icon" href={RobotProfileImage} type="image/png" />

            <div className="app-container">

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
            </div>

        </>
    );
}

export default App
