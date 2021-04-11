import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, 
    useHistory
  } from "react-router-dom";
import '../style/style.css'
import Login from './Login'
import Home from './Home'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const singup = async () => {
        const { status } = await axios.post('/account/signup', { username, password })
        if (status === 200) {
            const result = await axios.post('/account/login', { username, password })
            if (result.status == 200) {
                history.push("/")
            } else {
                console.log("ERROR")
            }
        } else {
            window.alert("Error")
        }
    }

    const toLogIn = () => {
        history.push("/login")
    }

    return (
        <Router>
            <Switch>
                <Route path="/signup">
                    <h3 className="text">Sign Up</h3>
                    <div className="entryTitle">
                        Username:
                    </div>
                    <input className="accountData" onChange={e => setUsername(e.target.value)} />
                    <div className="entryTitle">
                        Password:
                    </div>
                    <input className="accountData" onChange={e => setPassword(e.target.value)} />
                    <div></div>
                    <button className="accountButton" onClick={() => singup(username, password)}> Register </button>
                    <div className="text">Have an account already?</div>
                    <button className="accountButton" onClick={() => toLogIn()}> Click here to log in! </button>
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}

export default SignUp