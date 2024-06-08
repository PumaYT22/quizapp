import React,{useState,useEffect} from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home';
import Register from './Register';
import Login from './Login';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import Navbar from './components/Navbar/Navbar';
import WynikiPage from './pages/WynikiPage/WynikiPage';




function App() {


  const [auth,setAuth] = useState(false);
  const [message,setMessage]=useState('')
  const [name,setName]=useState('')
  const [id,setId]=useState(null)

  axios.defaults.withCredentials=true;
  useEffect(() => {
      axios.get('http://192.168.227.7:8082/verify',{ withCredentials: true })
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

  return (
    <BrowserRouter >
      <Routes >  
        <Route path='/' element={<Home />}></Route>
        <Route  path='/register' element={<Register />}></Route>
        <Route  path='/login' element={<Login />}></Route>
        <Route  path='/wyniki' element={<WynikiPage />}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
