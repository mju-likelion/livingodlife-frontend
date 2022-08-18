import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

function Header() {
  const logout = () => {
    sessionStorage.setItem("isAuthorized", false);
  };
  return (
    <div className="Header">
      <div className="HeaderLogo">'GOD생' 살기</div>
      <div className="HeaderPages">
        <Link to="/main">
          <span>Main</span>
        </Link>
        <Link to="/challenge">
          <span>Challenge</span>
        </Link>
        <Link to="/routine">
          <span>Routine</span>
        </Link>
      </div>

      <button className="HeaderLogin" onClick={logout}>
        <Link to="/" style={{ textDecoration: "none", color: "gray" }}>
          Logout
        </Link>
      </button>
    </div>
  );
}

export default Header;
