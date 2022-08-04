// import React from "react";
// import "./Header.css";
// import {Row,Col} from 'reactstrap'
// import { Link } from "react-router-dom";

// function Header() {
//   return (
//     <><div id="page-header" className="mb-3">
//       <Row>
//         <Col md="6" sm="auto" className="text-center m-auto">
//           <span className="logo"> 'GOD생' 살기 </span>
//           <span className="mainBtn"><Link to="/" style={{ textDecoration: 'none' }}>Main</Link></span>
//           <span className="challengeBtn"><Link to="/challenge" style={{ textDecoration: 'none' }}>Challenge</Link></span>
//           <span className="routineBtn"><Link to="/routine" style={{ textDecoration: 'none' }}>Routine</Link></span>
//           <span className="loginBtn"><Link to="/login" style={{ textDecoration: 'none' }}>Login</Link></span>

//         </Col>
//       </Row>
//     </div></>
//   );
// }

// export default Header;
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
              <Link to="/login">
                <button className="loginBtn">Login</button>
              </Link>
            </div>
      </div>
  );
}

export default Header;
