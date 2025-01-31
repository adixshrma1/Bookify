import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/login'
import Books from './pages/Books'
import ListBooks from './pages/ListBooks'
import MyBooks from './pages/MyBooks'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Welcome/>}/>
          <Route path='/books' element={<Books/>}  />
          <Route path='/listbooks' element={<ListBooks/>}/>
          <Route path='/mybooks' element={<MyBooks />}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App