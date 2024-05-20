import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

import './styles/Quiz.css'

const Home = () => {
    const [auth,setAuth] = useState(false);
    const [message,setMessage]=useState('')
    const [quizstart,setQuizStart]=useState(false)
    const [quiz,setQuiz]=useState([])
    const [poprawneOdp,setPoprawneOdp]=useState(0)
    const [nextq,setNextq]=useState(0)
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

    const handleQuiz = (event)=>{
        event.preventDefault();
        axios.post('http://localhost:8082/getquiz')
        .then(res=>{
            if(res.data){
                console.log(res.data)
                setQuiz(res.data)
                setQuizStart(true)
            } else{
                alert(res.data.Error);
                alert("blad")
            }
        })
        .then(err=>console.log(err));

       
    }

    const handleNext=()=>{
        const radioButtons = document.querySelectorAll('input[name="radio"]');
        const answer=quiz[nextq].odpowiedz
            let selectedSize;
            for (const radioButton of radioButtons) {
                if (radioButton.checked) {
                    selectedSize = radioButton.value;
                    if(answer===radioButton.value){
                        console.log("poprawna")
                        setPoprawneOdp(poprawneOdp+1)
                    }
                    break;
                }
            }
           
           console.log(selectedSize ? `You selected ${selectedSize}` : `You haven't selected any size`)
     

        
        setNextq(nextq+1);
    }

  return (
    <div className='container mt-4'>
        {
            auth ?
            <div>
                <h3>Jestes zalogowany {name}</h3>
                <button className='btn btn-primary' onClick={handleQuiz}>Start Quiz</button>
                <button className='btn btn-danger' onClick={handleDelete}>Wyloguj</button>
                <div className="quiz-container">
                    <h1>Quiz App</h1>
                  
                    <div id="Pytania">
                        {quizstart ?
                            quiz.map((x,index)=>
                                index===nextq ?
                                <div key={x.QuestionID}>
                                    <div className="py-2 h5"><b>Q. {x.content}</b></div>
                                        <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                                            <label className="options">{x.odpA}
                                                <input type="radio" value="A" name="radio" />
                                                <span className="checkmark"></span>
                                            </label>
                                            <label className="options">{x.odpB}
                                                <input type="radio" value="B" name="radio"/>
                                                <span className="checkmark"></span>
                                            </label>
                                            <label className="options">{x.odpC}
                                                <input type="radio" value="C" name="radio"/>
                                                <span className="checkmark"></span>
                                            </label>
                                            <label className="options">{x.odpD}
                                                <input type="radio" value="D" name="radio"/>
                                                <span className="checkmark"></span>
                                            </label>
                                            
                                    </div>
                                    <button className='btn btn-danger' onClick={handleNext}>Next</button>
                                </div>
                                :""
                            )
                        :
                        ""}
                    </div>
                    <h1>Ilosc poprawnych {poprawneOdp}/10</h1>
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