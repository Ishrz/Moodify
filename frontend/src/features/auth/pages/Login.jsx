import React, { useState } from "react";
import "../style/login.scss";
import { Link, useNavigate } from "react-router";
import FormGroup from "../components/FormGroup";
import { useAuth } from "../hook/useAuth";


const Login = () => {

  const navigate=useNavigate()

  const {loading,handleLogin} = useAuth()

  const [username,setUsername] =useState("")
  const [password, setPassword]=useState("")

  

  const handleSubmit = async (e)=>{
    e.preventDefault()

    await handleLogin({username,password})
    
    console.log("login done route to ")
    navigate("/")

  }

  
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please enter your details to sign in</p>

       

        <FormGroup value={username} onChange={(e)=> setUsername(e.target.value)} label="login Id" placeholder="Enter your ID" className="form-input" />
        <FormGroup value={password} onChange={(e)=> setPassword(e.target.value)} label="password" placeholder="********" className="form-input"/>
        <button type="submit" className="login-button">
          Sign In
        </button>

        <div className="login-footer">
            <p><Link to={"/register"}>New User? Registeration.</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;



 {/* <div className="form-group">
          <label htmlFor="loginId">Login ID</label>
          <input
            type="text"
            id="loginId"
            name="loginId"
            className="form-input"
            placeholder="Enter your ID"

            required
          />
        </div> */}

        {/* <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
          type="password"
          id="password"
          name="password"
          className="form-input"
          placeholder="••••••••"
          
          required
          />
          </div> */}