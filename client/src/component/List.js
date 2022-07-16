import React from 'react'
import { useNavigate } from 'react-router-dom';

function List(props) {

  console.log(props);
  const navigate = useNavigate();

  const { isExpired } = props

  if(isExpired){
    navigate('/');
  }
  

  return (
    <div>Listas</div>
  )
}

export default List