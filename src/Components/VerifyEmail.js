import './VerifyEmail.css';
import React, { useState, useEffect } from "react";

function VerifyEmail() {

  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);


  return (
    <div className="App">
      <div className="logo">'GOD생'살기</div>

      <p className='sent'>aaa@gmail.com 로 인증 이메일이 전송되었어요!</p>

      <input className='code' type="text" placeholder='인증코드'></input>
      
        <button className='time'>인증하기 {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</button>
        <br/>

      <a href='#' className='sendEmail'>인증 이메일이 도착하지 않았나요?</a>
        <br/>

      <button className='done'>회원가입 완료</button>

    </div>
  );
}


export default VerifyEmail;
