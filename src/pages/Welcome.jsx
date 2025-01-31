import React from "react";
import { Link } from "react-router-dom";



const Welcome = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[80%] text-center">
        <h1 className="text-7xl">Introducing Bookify</h1>
        <div className="mt-10 text-lg">
          <p>Your One Stop Solution for buying and Selling old books</p>
          <p className="mt-10 w-[60%] mx-auto">
            Chose between huge collection of books of different genre like
            Fantasy, Science Fiction, Romance, Horror and much more. List all
            your old books here for sale and customers will directly contact you
            for any purchase
          </p>
        </div>
        <Link to='/signup'>
          <button className="mt-10 text-3xl bg-black hover:bg-gray-800 text-white py-3 px-10 rounded-full cursor-pointer">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
