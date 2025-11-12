
function LoginForm() {

    return(
        <>
            <div>
                <input type="email" placeholder="Email"/>
            </div> 
            <div>  
                <input type="password" placeholder="Password"/>
            </div>
            <button>Login</button>   
            <button>Sign up</button>   
        </> 

    );
}




function App() {

    return (
        <>
            <p>Hello, welcome to my website</p>
            <LoginForm /> 
        </>    
    );
    
}


const container = document.querySelector('.js-container');

ReactDOM.createRoot(container).render(<App />);