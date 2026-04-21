import React, { useState } from "react";
import "../style/register.scss";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router";

const Register = () => {
  //   const onChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };

  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //     if (password !== confirmPassword) {
  //     //   alert("Passwords do not match");
  // } else {
  //         console.log('Registration Data:', formData);
  //       // Logic for API call goes here
  //     }
  //   };

  return (
    <div className="register-container">
      <form className="register-form">
        <h2 className="register-title">Create Account</h2>
        <p className="register-subtitle">
          Join us today! It only takes a minute.
        </p>

        {/* <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
          type="text"
          id="username"
          name="username"
          className="form-input"
          placeholder="johndoe123"
          value={username}
          onChange={onChange}
          required
          />
          </div> */}

        {/* <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          placeholder="email@example.com"
          value={email}
          onChange={onChange}
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
          value={password}
          onChange={onChange}
          required
          />
          </div> */}

        {/* <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="form-input"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={onChange}
          required
          />
          </div> */}

        <FormGroup
          label={"username"}
          placeholder={"Username"}
          className={"form-input"}
        />
        <FormGroup
          label={"email"}
          placeholder={"email@example.com"}
          className={"form-input"}
        />
        <FormGroup
          label={"password"}
          placeholder={"*********"}
          className={"form-input"}
        />
        <button type="submit" className="register-button">
          Register
        </button>

        <div className="register-footer">
          <span>Already have an account? </span>
          <Link to={"/login"}>Log In</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
