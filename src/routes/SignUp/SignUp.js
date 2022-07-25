import './SignUp.scss';
import { Link } from "react-router-dom";


function SignUp() {
  return (
    <div>

      <div className="logo">'GOD생'살기</div>

      <input className="mail2" type="text" placeholder='이메일 주소'></input>

      <p className='red'>이미 사용 중인 이메일 주소에요!</p>
      <p className='green'>사용해도 괜찮은 이메일 주소에요!</p>

      <input className='pw' type="password" placeholder='비밀번호'></input>
        <br/>
      <input className='pw' type="password" placeholder='비밀번호 다시 입력'></input>
      <p className='wrong'>비밀번호가 틀렸어요!</p>
      <br/>

      <button className='verify-btn'><Link to="/verifyemail" style={{ textDecoration: 'none'}}>이메일 인증</Link></button>

    </div>
  );
}

export default SignUp;
