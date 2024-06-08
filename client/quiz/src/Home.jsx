import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ob from './assets/obraz1.jpg'
import config from './config';
import './styles/Quiz.css'
import Navbar from './components/Navbar/Navbar';

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
        axios.get(`${config.API_BASE_URL}/verify`,{ withCredentials: true })
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
        axios.get(`${config.API_BASE_URL}/logout`)
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
        axios.post(`${config.API_BASE_URL}/getquiz`)
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
        axios.get(`${config.API_BASE_URL}/getsc?sortuj=`+sortuj)
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
            axios.post(`${config.API_BASE_URL}/sendscore`,{id,poprawneOdp,termin,minuty})
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
    <>
  
     <Navbar autoryzacja={auth} nazwa={name} ></Navbar>
    <section className="d-flex justify-content-center  w-100 h-100 bg-dark-subtle homepage" data-bs-theme="dark" >
    <div className='container mt-4'>
        {
            auth ?  
                <div className='d-flex flex-column justify-content-center'>
                   
                    <button className='btn btn-primary m-1 h-25 fs-4' onClick={handleQuiz}>Start Quiz / Zrestartuj</button>
                  
                    

                        <div className="quiz-container card">
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
    </>
  )
}

export default Home