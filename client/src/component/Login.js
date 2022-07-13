import React, { useEffect, useState } from 'react'
import '../css/login.css'

function Login() {

  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {

    return () => {
      
    }
  }, [])
  

  return (
    <div className='outer'>
      <div className='login-div'>
        <div className='username-div'>
          <span>USERNAME</span>
          <input type='text' />
        </div>

        <div className='box'></div>

        <div className='password-div'>
          <span>PASSWORD</span>
          <input type='password' />
        </div>

        <div className='box2'></div>

        <div className='button-div'>
          <button type='button'>로그인</button>
          <button type='button'>회원가입</button>
        </div>
      </div>
    </div>
  )
}

export default Login
