import React from "react";
import { Link } from "react-router-dom";
import "./styles/register.css"

const registerpage  = () => {
  return (
    <div className="regCont">
            <div className="regcontainer">
                <form className="regForm" method="post" action = "register">
                    <h1 id="signupHeader"> SIGNUP</h1>
                    <input id="uNameField" type="text" placeholder="Email" name="uname" required />
                    <input id="pWordField" type="password" placeholder="Password" name="psw" required/>
                    <button id="submitReg" type="submit">Register</button>
                </form>
                <Link to="/login" id="haveAcct">Already with us? Log in now! </Link>

            </div>
            <div className="regGreeting">
                <h1 id="welcomeHeader">Welcome back,<span id="colorText"> creative!</span> </h1>
            </div>

        </div>
  );
};

export default registerpage;