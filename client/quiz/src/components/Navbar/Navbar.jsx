import React,{useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = (props) => {

    const handleDelete=()=>{
        axios.get('http://192.168.227.7:8082/logout')
        .then(res=>{
            window.location.reload();
           
        }).catch(err=>console.log(err))
    }



  return (
    
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        {props.autoryzacja ? 
            <div className="container-fluid">
                    <button className="navbar-toggler" type="button"  data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">QuizyINF04</a>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Strona Główna</Link> 
                        
                        </li>
                        <li className="nav-item">
                            <Link to="/wyniki/" className="nav-link">Tablica Wyników</Link> 
                        </li>
                        <li className="nav-item">
                        <a className="nav-link disabled" aria-disabled="true">Admin</a>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <button class="btn" type="submit">Zalogowano na {props.nazwa}</button>
                        <button class="btn btn-outline-danger" onClick={handleDelete} type="submit">Wyloguj</button>
                    </form>
                    </div>
            </div>
            :
            <div class="container-fluid">
                    <button class="navbar-toggler" type="button"  data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <a class="navbar-brand" href="#">QuizyINF04</a>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link to="/" className="nav-link">Strona Główna</Link>  
                        </li>
                        <li class="nav-item">
                            <Link to="/wyniki/" className="nav-link">Tablica Wyników</Link> 
                        </li>
                        <li class="nav-item">
                        <a class="nav-link disabled" aria-disabled="true">Admin</a>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                      
                        <Link to="/login" className='btn btn-outline-primary'>Zaloguj się</Link>      
                    </form>
                    </div>
            </div>
        }
        
    </nav>
  )
}

export default Navbar