import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './component/Login';
import Regist from './component/Regist';
import jwt_decode from 'jwt-decode'
import MainList from './component/MainList';
import axios from 'axios';
import Cookie from 'js-cookie'
import CreatePost from './component/CreatePost';

function App() {

  axios.defaults.baseURL = 'http://localhost:4000';
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use((config) => {
    console.log(config);
    return config;
  }, (err) => {
    console.log(err);
    return Promise.reject(err);
  })

  axios.interceptors.response.use(function (res){
    console.log(res);
    return res;
  }, function (err){
    console.log(err);
    return Promise.reject(err);
  });

  const navigate = useNavigate();

  const [isExpired, setIsExpired] = useState(false)

  // useEffect(() => {

  //   console.log('refresh token');

  //   axios.post('/auth/refresh')
  //   .then(res => {
  //     console.log(res)
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     navigate('/');
  //   })
  
  //   return () => {
      
  //   }
  // }, [isExpired])
  

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/regist" element={<Regist />} />

      <Route path="/list" element={<MainList isExpired={isExpired} />} />
      <Route path="/create" element={<CreatePost isExpired={isExpired} />} />
    </Routes>
  )
}

export default App