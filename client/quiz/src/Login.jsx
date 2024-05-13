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
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
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
        </div>
    </div>
  )
}

export default Login