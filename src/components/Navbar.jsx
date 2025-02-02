import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const Navbar = () => {
  const { logOut, isLoggedIn, user } = useFirebase();
  const navigate = useNavigate();
  const handleSignOut = ()=>{
    logOut().then(() => console.log("success")).catch(err => console.log(err.message))
  }
  return (
    <div className="fixed top-0 w-full flex items-center justify-around py-3 text-lg bg-gray-900 text-gray-100">
      <div>
        <NavLink to="/">
          <h1 className="cursor-pointer text-2xl">Bookify</h1>
        </NavLink>
      </div>
      <div className="flex gap-10">
        <NavLink to='/books' style={({isActive}) => ({textDecoration: isActive ? 'underline': 'none'})}><p className="cursor-pointer">Books</p></NavLink>
        <NavLink to='/listbooks' style={({isActive}) => ({textDecoration: isActive ? 'underline': 'none'})}><p className="cursor-pointer">List Books</p></NavLink>
        <NavLink to='/mybooks' style={({isActive}) => ({textDecoration: isActive ? 'underline': 'none'})}><p className="cursor-pointer">My Books</p></NavLink>
      </div>
      <div className="flex items-center gap-2">
        { user && <img className="w-8 rounded-full" src={user.photoURL}/>}
        { isLoggedIn? (
          <button className="bg-white hover:bg-gray-200 text-black py-1 px-5 rounded-full cursor-pointer"
          onClick={handleSignOut}
        >
          Logout
        </button>
        ): (
          <button className="bg-white hover:bg-gray-200 text-black py-1 px-5 rounded-full cursor-pointer"
          onClick={()=> navigate('/login')}
        >
          Login
        </button>
        )}
        
      </div>
    </div>
  );
};

export default Navbar;
