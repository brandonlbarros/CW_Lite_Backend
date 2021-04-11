import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Login from './Login'
import SignUp from './SignUp';

const Home = () => {
    const [qs, setQs] = useState([])
    const [selectedQ, setSelectedQ] = useState({})
    const [answer, setAnswer] = useState('')
    const [questionText, setQuestionText] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const [author, setAuthor] = useState('')

    const selectQuestion = (q) => {
        setSelectedQ(q)
    }

    const answerQ = async () => {
        const { _id } = selectedQ
        const { data, status } = await axios.post('/api/questions/answer', {_id, answer})
        if (status === 200) {
            setSelectedQ(data)
            console.log(data)
            console.log("worked")
        } else {
            console.log("did not work")
        }
    }

    const logout = async () => {
        const { status } = await axios.post('/account/logout', {})
        if (status === 200) {
            setLoggedIn(false)
            console.log("OK")
        } else {
            console.log("messed")
        }
    }

    const addQ = async () => {
        const { data, status } = await axios.post('/api/questions/add', {questionText, author})
        if (status === 200) {
            console.log(data)
            console.log("workedadd")
        } else {
            console.log("did not work")
        }
    }


    useEffect(() => {
        const intervalID = setInterval(() => {
            (async () => {
                const { status, data } = await axios.get('/api/questions', {})
                if (status === 200) {
                    setQs(data)
                } else {
                    console.log("Error")
                }

                const result = await axios.get('/account/check', {})
                const d = result.data
                const username = d.username
                if (username) {
                    console.log(data)
                    setLoggedIn(true)
                    setAuthor(username)
                } else {
                    //console.log("NAHHHHH")
                }
            })();
        }, 2000)
        return () => clearInterval(intervalID)
      }, [qs])

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <h2>
                        Campuswire Lite
                    </h2>
                    {loggedIn ?
                        <div>
                            <div>
                            Hi, {' ' + author}!
                            </div>
                            <div>
                                <button className="accountButton" onClick={() => logout()}> Log Out </button>
                            </div>
                        </div>:
                        <div></div>
                    }
                    
                    <hr />
                    <div className="container">
                        <div className="left">
                            {loggedIn ?
                            <div>
                                <input className="questionData" placeholder="Add question here..." onChange={e => setQuestionText(e.target.value)} />
                                <div></div>
                                <button className="homeButton" onClick={() => addQ()}> Add Question </button>
                            </div> :

                            <Link to="/login" replace>
                                <button className="homeButton">Want to post a question? Login!</button>
                            </Link>}
                            <h3>Questions</h3>
                            {qs.map(q =>
                                <div key={Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)}>
                                    <button className="questionButton" onClick={() => selectQuestion(q)}>
                                        <div>
                                            <div>
                                                Question: {q.questionText}
                                            </div>
                                            <div>
                                                Author: {q.author}
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="vertLine"></div>
                        <div className="right"> 
                            <div>
                                <h4>
                                    {(selectedQ.questionText) ? selectedQ.questionText : 'Select a Question to See Info!'}
                                </h4>
                                {selectedQ.questionText ?
                                <div>
                                <b>
                                    Author:
                                </b>
                                <div>
                                    {selectedQ.author}
                                </div>
                                <p></p>
                                <b>
                                    Answer:
                                </b>
                                <div>
                                    {selectedQ.answer}
                                </div>
                                <p></p>
                                {loggedIn ?
                                    <div>
                                        <b>
                                            Write a new answer:
                                        </b>
                                        <div></div>
                                        <input onChange={e => setAnswer(e.target.value)} />
                                        <div></div>
                                        <button className="accountButton" onClick={() => answerQ(answer)}> Answer </button>
                                    </div> :
                                    <div></div>
                                }
                                </div>
                                :
                                <div></div>
                            }    
                            </div>
                        </div>
                    </div>
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
            </Switch>
        </Router>

    )
}

export default Home