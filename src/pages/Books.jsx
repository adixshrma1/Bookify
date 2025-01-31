import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirebase } from '../context/Firebase';

const Books = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useFirebase();
    useEffect(()=>{
        if(!isLoggedIn) navigate("/")
    }, [isLoggedIn])
  return (
    <div className='p-10 mt-20'>Books</div>
  )
}

export default Books