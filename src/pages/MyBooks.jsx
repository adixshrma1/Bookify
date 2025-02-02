import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const MyBooks = () => {
  const navigate = useNavigate();
  const { isLoggedIn, listMyBooks } = useFirebase();
  const [books, setBooks] = useState(null);

  useEffect(()=>{
    if(isLoggedIn){
      listMyBooks().then(data => setBooks(data.docs))
    } else navigate('/')
  },[isLoggedIn])

  if(books === null) return <h1 className='mt-20 w-[80%] mx-auto'>Loading...</h1>
  return (
    <>
    <div className='mt-20 mx-auto w-[80%]'>
      {books.length === 0 ? (
          <h1 className='text-2xl text-center pt-10'>You don't have any Books</h1>
      ): (
        <div className='grid grid-cols-4 gap-3'>
        {books.map((book)=> (
          <Card key={book.id} id={book.id} {...book.data()}/>
        ))}
      </div>
      )}
    </div>
    
    </>
  )
}

export default MyBooks