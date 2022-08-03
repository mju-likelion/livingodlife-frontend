import "./Login.scss";
import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <div className="logo">'GOD생'살기</div>
      <input
        className="mail notoSans"
        type="text"
        placeholder="이메일 주소"
      ></input>
      <input
        className="pw notoSans"
        type="password"
        placeholder="비밀번호"
      ></input>
      <br />
      <button className="login-btn notoSans">로그인</button>
      <div className="forgot-pw notoSans">계정을 잃어버리셨나요?</div>
        <Link
          to="/signup"
          style={{ textDecoration: "none", color: "rgba(129, 129, 129, 1)" }}
        >
          회원가입
        </Link>
    </div>
  );
}

export default Login;
