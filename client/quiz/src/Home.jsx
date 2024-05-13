import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

import './styles/Quiz.css'

const Home = () => {
    const [auth,setAuth] = useState(false);
    const [message,setMessage]=useState('')
    const [name,setName]=useState('')

    axios.defaults.withCredentials=true;
    useEffect(() => {
        axios.get('http://localhost:8082')
        .then(res=>{
            if(res.data.Status==="Success"){
                setAuth(true)
                setName(res.data.name)
               
            } else{
                setAuth(false)
                setMessage(res.data.Error)
            }
        })
        .then(err=>console.log(err));
        
        
    }, []);

    const handleDelete=()=>{
        axios.get('http://localhost:8082/logout')
        .then(res=>{
        
           
        }).catch(err=>console.log(err))
    }
  return (
    <div className='container mt-4'>
        {
            auth ?
            <div>
                <h3>Jestes zalogowany {name}</h3>
                <button className='btn btn-danger' onClick={handleDelete}>Wyloguj</button>
                <div class="quiz-container">
                    <h1>Quiz App</h1>
                    <div id="question-container">
                    <p id="question-text"></p>
                    <div id="answer-buttons"></div>
                    </div>
                    <div id="controls-container">
                    <button id="start-button">Start Quiz</button>
                    <div id="timer-container">
                        <span id="timer-text">Time Left: <span id="timer">0</span></span>
                    </div>
                    </div>
                </div>
            </div>
            :
            <div>
                <h3>{message}</h3>
                <h3>Zaloguj się teraz</h3>
                <Link to="/login" className='btn btn-primary'>Login</Link>
            </div>
        }
    </div>
  )
}

export default Home