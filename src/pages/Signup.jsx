import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const { isLoggedIn, signupWithEmailPass, signInWithGoogle } = useFirebase();
  useEffect(() => {
    if (isLoggedIn) navigate("/books");
  }, [isLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signupWithEmailPass(email, pass).then((userCredentials) =>
      console.log(userCredentials.user)
    );
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="shadow-sm border-2 border-gray-200 w-[30%] p-5 rounded-xl flex flex-col gap-5"
        >
          <h1 className="text-center text-3xl font-semibold">
            Signup Form
          </h1>
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded border-2 border-gray-200 outline-0"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="p-2 rounded border-2 border-gray-200 outline-0"
          />
          <div>
            <button className="w-full mb-1 p-2 rounded bg-black hover:bg-gray-800 text-white">
              Signup
            </button>
            <p className="font-light">
              already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="font-medium cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
          <div className="flex items-center justify-around">
            <div className="h-[2px] basis-[40%] bg-gray-200"></div>
            <p className="text-center">OR</p>
            <div className="h-[2px] basis-[40%] bg-gray-200"></div>
          </div>
          <button type="button" onClick={signInWithGoogle} className="p-2 rounded border-2 border-gray-200 hover:bg-gray-100">
            <FontAwesomeIcon icon={faGoogle} className="mr-2"/> Signup with Google
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
