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

  const navigate = useNavigate();

  axios.defaults.baseURL = 'http://localhost:4000';
  axios.defaults.withCredentials = true;

  // axios.interceptors.request.use((config) => {
  //   console.log(config);
  //   return config;
  // }, (err) => {
  //   console.log(err);
  //   return Promise.reject(err);
  // })

  axios.interceptors.response.use( (res) => {
    console.log(res);
    return res;
  }, (err) => {
    console.log(err);

    const {config} = err;
    const originalConfig = err.config;

    if(err.response.status === 401 && !originalConfig._retry){
      // const originalRequest = config;
      originalConfig._retry = true;
      console.log(111);
      console.log(originalConfig);

      axios.post('/auth/refresh')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        navigate('/');
      })
      
      return axios(originalConfig);
    }else{
      return Promise.reject(err.response.data);
    }

    return Promise.reject(err);
  });

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/regist" element={<Regist />} />

      <Route path="/list" element={<MainList />} />
      <Route path="/create" element={<CreatePost />} />
    </Routes>
  )
}

export default App