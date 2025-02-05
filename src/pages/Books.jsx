import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirebase } from '../context/Firebase';
import Card from '../components/Card';

const Books = () => {
    const navigate = useNavigate();
    const { isLoggedIn, listAllBooks } = useFirebase();

    const [books, setBooks] = useState(null);

    useEffect(()=>{
      if(!isLoggedIn) navigate("/")
      else listAllBooks().then(res => setBooks(res.docs))
    }, [isLoggedIn])

  if(books === null) return <h1 className='mt-20 w-[80%] mx-auto'>Loading...</h1>

  return (
    <div className='mt-20 mx-auto w-[80%] grid grid-cols-4 gap-3'>
      {books.map((book) => (
        <Card key={book.id} link={`/books/view/${book.id}`} {...book.data()}/>
      ))}
    </div>
  )
}

export default Books