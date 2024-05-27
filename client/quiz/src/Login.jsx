import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'


function Login() {

    const [values, setValues]=useState({
        email:'',
        password:''
    })

    const navigate=useNavigate()
    axios.defaults.withCredentials=true;
    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.post('http://localhost:8082/login',values)
        .then(res=>{
            if(res.data.Status==="Success"){
                navigate('/')
            } else{
                alert(res.data.Error);
                alert("blad")
            }
        })
        .then(err=>console.log(err));
    }

  return (
    <div className='d-flex justify-content-center align-items-center  vh-100 vw-100' style={{backgroundColor: "#eee"}}>
        {/* <div className='bg-white p-3 rounded w-25'>
            <h2>Zaloguj się</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type="text" placeholder='Podaj Email' name='email' 
                    className='form-control rounded-0'
                    onChange={e=>setValues({...values,email:e.target.value})}
                    ></input>
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Hasło</strong></label>
                    <input type="text" placeholder='Podaj Hasło' name='password' 
                    className='form-control rounded-0'
                    onChange={e=>setValues({...values,password:e.target.value})}
                    ></input>
                </div>
                <button type="submit" className='btn btn-success w-100 rounded-0'>Zaloguj się</button>
                <p>Zgadzasz się na naszą politykę i regulamin oraz warunki korzystania</p>

                <Link to="/register" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Zarejestruj się</Link>
            </form>
        </div> */}
        <section class="vh-100" style={{backgroundColor: "#eee"}}>
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-lg-12 col-xl-11">
                        <div class="card text-black" style={{borderRadius:"25px"}}>
                        <div class="card-body p-md-5">
                            <div class="row justify-content-center">
                            <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Logowanie</p>

                                <form class="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                <div class="d-flex flex-row align-items-center mb-4">
                                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                    <label class="form-label" htmlFor='email'>Twój Email</label>
                                    <input type="text" placeholder='Podaj Email' name='email' required
                                        className='form-control rounded-0'
                                        onChange={e=>setValues({...values,email:e.target.value})}
                                        ></input>
                                    
                                    </div>
                                </div>

                                <div class="d-flex flex-row align-items-center mb-4">
                                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                    <label class="form-label" htmlFor='password'>Twójo Hasło</label>
                                    <input type="text" placeholder='Podaj Hasło' name='password' required
                    className='form-control rounded-0'
                    onChange={e=>setValues({...values,password:e.target.value})}
                    ></input>
                                    
                                    </div>
                                </div>

                               


                                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">   
                                    <button type="submit" style={{height:"50px",marginRight:"10px"}} class="btn btn-primary btn-lg">Zaloguj się</button>          
                                    <Link to="/register"  style={{height:"50px",scale:"0.8"}} class="btn btn-primary btn-lg">Zarejesturj się</Link>
                                </div>

                                </form>

                            </div>
                            <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                className="img-fluid" alt="Przykładowy obrazek"/>

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
        </section>
    </div>
  )
}

export default Login