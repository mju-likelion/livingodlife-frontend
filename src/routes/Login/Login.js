import './Login.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import Kakao from '../../image/kakao-icon.png';

function Login() {

  return (
    <div>
      <div className="logo">'GOD생'살기</div>

      <input className='mail' type="text" placeholder='이메일 주소'></input>
        <br/>
      <input className='pw' type="password" placeholder='비밀번호'></input>
        <br/>

      <button className='login-btn'>로그인</button>

      <div className="hr-sect">또는</div>

      <button className="kakao"><img src={Kakao} style={{ width: '15px', height:'15px'}}/> 카카오톡 계정으로 로그인</button>

      <div className="forgot-pw">계정을 잃어버리셨나요?</div>
      <a href='./SignUp.js' className="sign-up"><Link to="/signup">회원가입</Link></a>

    </div>
  );
}

export default Login;

