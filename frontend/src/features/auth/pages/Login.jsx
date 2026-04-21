import React, { useState } from "react";
import "../style/login.scss";
import { Link } from "react-router";
import FormGroup from "../components/FormGroup";

const Login = () => {
  //   const onChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };

  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //     console.log('Login Attempt:', formData);
  //     // Add your login logic here
  //   };

  return (
    <div className="login-container">
      <form className="login-form">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please enter your details to sign in</p>

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

        <FormGroup label={"login Id"} placeholder={"Enter your ID"} className={"form-input"} />
        <FormGroup label={"password"} placeholder={"********"} className={"form-input"}/>
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
