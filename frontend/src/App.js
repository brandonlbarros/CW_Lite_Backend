import React, {useState, useEffect} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import axios from 'axios'
import SignUp from './SignUp'
import Home from './Home'
import Login from './Login'

const App = () => {
    return (
        <Home loggedIn={false} author={''}/>
    )
}

export default App

/*
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
            <hr />




            <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <Home loggedIn={false}/>
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
            </div>
        </Router>
            */