import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
      <div className="header">
            <div className="logo">'GOD생' 살기 <Link to="/"></Link></div>
            <div className="routePage">
              <Link to="/" >
                <span>Main</span>
              </Link>
              <Link to="/challenge">
                <span>Challenge</span>
              </Link>
              <Link to="/routine" >
                <span>Routine</span>
              </Link>
            </div>
            <Link to="/login">
              <button className="loginBtn">Login</button>
            </Link>
      </div>
  );
}

export default Header;
