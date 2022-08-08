import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="headerLogo">
        'GOD생' 살기 <Link to="/"></Link>
      </div>
      <div className="headerRoutePage">
        <Link to="/">
          <span>Main</span>
        </Link>
        <Link to="/challenge">
          <span>Challenge</span>
        </Link>
        <Link to="/routine">
          <span>Routine</span>
        </Link>
      </div>
      <Link to="/login">
        <button className="headerLoginBtn">Login</button>
      </Link>
    </div>
  );
}

export default Header;
