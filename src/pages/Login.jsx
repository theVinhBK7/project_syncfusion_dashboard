import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { loginAPI } from "../apis/api";
import { useStateContext } from "../contexts/ContextProvider";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";

const Login = () => {
  const { setUserToken } = useStateContext();
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;

    try {
        loginAPI({ username: username, password: password }).then(function (response) {
            console.log(response);
            if (response.status === "Login success"){
                setUserToken(response.token)
                navigate("/")
            }
        }).catch(function (error) {
            console.log(error);
        });
    
    } catch (err) {
      setErr(true);
    }
  };


  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Speech to Text VLG</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="username" placeholder="username" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;