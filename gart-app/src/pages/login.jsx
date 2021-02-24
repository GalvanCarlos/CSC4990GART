import React from "react";
import { Link } from "react-router-dom";
import "./login.css"

/* We simply can use an array and loop and print each user */
const loginpage  = () => {
  return (
    <div>
      <h1>this is the login page</h1>
      <div className="loginContainer">

        <label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname" required />

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required />

        <button type="submit">Login</button>

      </div>
      <Link to="/">back to home</Link>
    </div>
  );
};

export default loginpage;