import React from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home';
import Register from './Register';
import Login from './Login';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route  path='/register' element={<Register />}></Route>
        <Route  path='/login' element={<Login />}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
