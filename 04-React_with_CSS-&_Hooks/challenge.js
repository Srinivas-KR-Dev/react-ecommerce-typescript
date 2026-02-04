
function LoginForm() {

    const [showPassword, setShowPassword] = React.useState(true);


    function toggleShowPassword() {
        setShowPassword(!showPassword);
        /* Another solution is:
        if (showPassword) {
          setShowPassword(false);
        } else {
          setShowPassword(true);
        } */

    }


    return (

        <>

            <div>
                <input
                    placeholder="Email"
                    className="login-input"
                />
            </div>
            <div>
                <input
                    placeholder="Password"
                    type={showPassword ? 'password' : 'text'}
                    className="login-input"
                />
                <button
                    className="show-button"
                    /* onClick={()=>{setShowPassword(!showPassword)}} */
                    onClick={toggleShowPassword}
                >{showPassword ? 'Show' : 'Hide'}</button>
            </div>

            <button className="login-button">Login</button>
            <button className="login-button">Sign up</button>

        </>

    );
}




function Time() {

    const [currentTime, setCurrentTime] = React.useState(dayjs().format('HH:mm:ss'));

    React.useEffect(() => {

        setInterval(() =>
            setCurrentTime(dayjs().format('HH:mm:ss')), 1000
        );
    }, []);


    return (
        <p>Current Time:{currentTime}</p>
    );
}


function App() {
    return (
        <>
            <h2>Hello, welcome to my website</h2>
            <LoginForm />
            <Time />

        </>
    );
}

const container = document.querySelector('.js-container');

ReactDOM.createRoot(container).render(<App />);


/* setInterval(() => {
    const paragraph = <p>Current time: {dayjs().format('HH:mm:ss')}</p>

    root.render(paragraph);
    
}, 1000);
 */
