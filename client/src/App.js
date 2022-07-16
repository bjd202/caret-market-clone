import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import Regist from './component/Regist';
import jwt_decode from 'jwt-decode'
import List from './component/List';

function App() {

  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    console.log(token);

    if(token === null){
      setIsExpired(true);
      return;
    }

    const decode = jwt_decode(token);
    console.log(decode);
    const now = new Date();
    console.log(now.getTime())

    if(decode.exp * 1000 < now.getTime()){
      setIsExpired(true);
      return;
    }
  
    return () => {
      
    }
  }, [])
  

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/regist" element={<Regist />} />

      <Route path="/list" element={<List isExpired={isExpired} />} />
    </Routes>
  )
}

export default App