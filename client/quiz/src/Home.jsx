import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ob from './assets/obraz1.jpg'

import './styles/Quiz.css'

const Home = () => {
    const [auth,setAuth] = useState(false);
    const [message,setMessage]=useState('')
    const [quizstart,setQuizStart]=useState(false)
    const [czasr,setCzar]=useState(null)
    const [tabela,setTabela]=useState(false)
    const [tabelawyniki,setTabelawyniki]=useState([])
    const [quiz,setQuiz]=useState([])
    const [poprawneOdp,setPoprawneOdp]=useState(0)
    const [nextq,setNextq]=useState(0)
    const [name,setName]=useState('')
    const [id,setId]=useState(null)

    axios.defaults.withCredentials=true;
    useEffect(() => {
        axios.get('http://172.17.0.173:8082/verify',{ withCredentials: true })
        .then(res=>{
            if(res.data.Status==="Success"){
                setAuth(true)
                setName(res.data.name)
                setId(res.data.id)
            } else{
                setAuth(false)
                setMessage(res.data.Error)
            }
        })
        .then(err=>console.log(err));
        console.log(id)
        
    }, []);

    const handleDelete=()=>{
        axios.get('http://172.17.0.173:8082/logout')
        .then(res=>{
            window.location.reload();
           
        }).catch(err=>console.log(err))
    }

    const handleQuiz = (event)=>{
        console.log(id)
        setTabela(false)
        setNextq(0)
        setPoprawneOdp(0)
        setCzar(Date.now)
        event.preventDefault();
        axios.post('http://172.17.0.173:8082/getquiz')
        .then(res=>{
            if(res.data){
                console.log(res.data)
                setQuiz(res.data)
                setQuizStart(true)
            } else{
                alert(res.data.Error);
                alert("Błąd")
            }
        })
        .then(err=>console.log(err));
    }

    const handleScoreboard=(sortuj)=>{
        setTabela(true)
        axios.get('http://172.17.0.173:8082/getsc?sortuj='+sortuj)
        .then(res=>{
            if(res.data){
                setTabelawyniki(res.data)    
            } else{
                alert(res.data.Error);
                alert("Błąd")
            }
        })
        .then(err=>console.log(err));
        console.log(tabelawyniki)
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

        
        setNextq(nextq+1);
        setTimeout(() => {
            if(nextq>=9){
            let d=new Date()
            let termin=(d.toISOString()).split('T')[0]
            let czas=czasr-Date.now()
            let minuty=Math.abs((Math.floor((czas / 1000) % 60)));
            axios.post('http://172.17.0.173:8082/sendscore',{id,poprawneOdp,termin,minuty})
            .then(res=>{
                if(res.data){
                    console.log(res.data)
                } else{
                    alert(res.data.Error);
                    alert("blad")
                }
            })
            .then(err=>console.log(err));
        }
        }, 1000);
        
        
            
    }

  return (
    <section class="d-flex justify-content-center align-items-center vw-100" style={{backgroundColor: "#eee"}}>
    <div className='container mt-4'>
        {
            auth ?  
                <div>
                    <h3>Jestes zalogowany {name}</h3>
                    <button className='btn btn-primary m-1' onClick={handleQuiz}>Start Quiz</button>
                    <button className='btn btn-danger m-1' onClick={handleDelete}>Wyloguj</button>
                    <button className='btn btn-success m-1' onClick={()=>{handleScoreboard(0)}}>Tabela Wyników</button>
                    {tabela ? 
                    <div>
                        <button className='btn btn-warning m-1' onClick={()=>{handleScoreboard(1)}}>Sortuj po Terminie</button>
                        <button className='btn btn-warning m-1' onClick={()=>{handleScoreboard(2)}}>Sortuj po Czasie</button>
                        <button className='btn btn-warning m-1' onClick={()=>{handleScoreboard(0)}}>Sortuj po Wyniku</button>
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Nazwa Gracza</th>
                                <th>Wynik</th>    
                                <th>Data Wykonania</th>
                                <th>Czas Wykonania</th>
                            </tr>
                            </thead>
                            <tbody>
                                
                                {tabelawyniki.map((x,index)=>
                                    
                                    
                                    <tr key={index}>
                                        <td>{x.name}</td>
                                        <td>{x.wynik}</td>
                                        <td>{(x.termin).split("T")[0]}</td>
                                        <td>{x.czas}s</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        </div>
                    :

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
                    }
           
                </div>
            :
            <div className="card mb-3" style={{maxWidth:"940px"}}>
            <div className="row g-0">
                <div className="col-md-4">
                <img
                    src={ob}
                    alt="Trendy Pants and Shoes"
                    className="img-fluid rounded-start"
                />
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">Zaloguj się teraz!</h5>
                    <p className="card-text">
                    Musisz się zalogować, aby zacząć korzystać z naszej strony!!
                    </p>
                    <hr></hr>
                    <p className="card-text">
                    Nasza strona oferuje quizy do inf 04. Przygotowuje was żeby zdać egzamin teoretyczny na 100%!
                    </p>
                    <hr></hr>
                    <p className="card-text">
                    Stronę przygotowali Jakub Guźda i Kamil Kurpisz z Klasy 4B jako projekt z aplikacji webowych.
                    </p>
                    <Link to="/login" className='btn btn-primary'>Login</Link>
                    <p className="card-text">
                    <small className="text-muted">{message}</small>
                    </p>
                </div>
                </div>
            </div>
        </div>
        }
    </div>
    </section>
  )
}

export default Home