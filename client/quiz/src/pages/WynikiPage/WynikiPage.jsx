import React,{useEffect, useState} from 'react'

import axios from 'axios'
import '../../App.css';
import Navbar from '../../components/Navbar/Navbar'

const WynikiPage = () => {

    const [tabelawyniki,setTabelawyniki]=useState([])

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


    const handleScoreboard=(sortuj)=>{
       
        axios.get('http://192.168.227.7:8082/getsc?sortuj='+sortuj)
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

    useEffect(() => {
        handleScoreboard()
    
    }, [])
    


  return (
    <div className='vw-100 vh-100' data-bs-theme="dark" style={{backgroundColor:"rgb(27,29,33)"}}>
        <Navbar autoryzacja={auth} nazwa={name}></Navbar>
        <div className='container mt-4'>
                <button className='btn btn-warning m-1 ' onClick={()=>{handleScoreboard(1)}}>Sortuj po Terminie</button>
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
        
    </div>
  )
}

export default WynikiPage