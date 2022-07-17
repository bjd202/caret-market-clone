import React from 'react'
import { useNavigate } from 'react-router-dom';

function List(props) {

  console.log(props);
  const navigate = useNavigate();

  const { isExpired } = props

  if(isExpired){
    alert('refresh token 만료');
    navigate('/');
  }
  

  return (
    <div>Listas</div>
  )
}

export default List