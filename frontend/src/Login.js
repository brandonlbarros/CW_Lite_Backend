import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    browserHistory
  } from "react-router-dom";
import '../style/style.css'
import SignUp from './SignUp'
import Home from './Home'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const login = async () => {
        const { status } = await axios.post('/account/login', { username, password })
        if (status === 200) {
            console.log("OK")
            history.push("/")
        } else {
            window.alert("Incorrect login")
            console.log("messed")
        }
    }

    const toSignUp = () => {
        history.push("/signup")
    }

    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <h3 className="text">Log In</h3>
                    <div className="entryTitle">
                        Username:
                    </div>
                    <input className="accountData" onChange={e => setUsername(e.target.value)} />
                    <div className="entryTitle">
                        Password:
                    </div>
                    <input className="accountData" onChange={e => setPassword(e.target.value)} />
                    <div></div>
                    <button className="accountButton" onClick={() => login(username, password)}> Login </button>
                    <div className="text">Don't have an account?</div>
                    <button className="accountButton" onClick={() => toSignUp()}> Click here to signup! </button>
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route exact path="/">
                    <Home loggedIn={true} author={username} />
                </Route>
            </Switch>
        </Router>
    )
}

export default Login