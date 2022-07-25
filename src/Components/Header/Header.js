import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {

  /*function upnav() {
    document.addEventListener("scroll", onScroll, { passive: true });
    var last = 0;
    const gap = 1;
    const nav = docunment.querySelector("nav");
    const headerheight = docunment.querySelector("header").clientHeight;

    function onScroll() {
      const scrollpositon = pageYOffset;
      if (Math.abs(last - scrollpositon) <= gap) return;
      else if (scrollpositon > last || scrollpostion <= headerheight) {
        nav.classList.remove("downdown");
      } else if (scrollposion < last) {
        nav.classList.add("downdown");
      }

      last = scrollpostion;
    }
  }

  upnav();*/

  return (
    <>
    <h1 className="God"> 'GOD생' 살기 </h1>
    <nav>
        <span className="a"><Link to="/" style={{ textDecoration: 'none'}}>Main</Link></span>
        <span className="b"><Link to="/challenge" style={{ textDecoration: 'none'}}>Challenge</Link></span>
        <span className="c"><Link to="/routine" style={{ textDecoration: 'none'}}>Routine</Link></span>
        <span className="d"><Link to="/login" style={{ textDecoration: 'none'}}>Login</Link></span>
    </nav>
    </>
  );
}

export default Header;
