import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

function Header() {
  const logout = () => {
    sessionStorage.setItem("isAuthorized", false);
  }
  return (
      <div className="header">
            <div className="logo">'GOD생' 살기 <Link to="/main"></Link></div>
            <div className="routePage">
              <Link to="/main" >
                <span>Main</span>
              </Link>
              <Link to="/challenge">
                <span>Challenge</span>
              </Link>
              <Link to="/routine" >
                <span>Routine</span>
              </Link>
            </div>
            <Link to="/">
              <button className="loginBtn" onClick={logout}>Logout</button>
            </Link>
      </div>
  );
}

export default Header;
