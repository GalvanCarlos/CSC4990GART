import React from "react";
import { Link } from "react-router-dom";
import "./styles/index.css"
//Functional Component 
  
const Welcome = () => {
  return (
    <div className="container">
      <div className="navigation">navbar here</div>
        <div className="logotype">GART </div>
        <div className="logopic">logo here</div>
        <div className="slogan">A creative forum for gaming art </div>
        <div className="loginflow">
          <Link to="/login" className="headertext_li">LOGIN</Link>
        </div>
        <div className="signupflow">
          <Link to="/login" className="headertext_su">SIGN UP</Link>
        </div>
    </div>
  );
};

export default Welcome;