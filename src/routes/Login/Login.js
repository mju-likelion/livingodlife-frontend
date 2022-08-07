import "./Login.scss";
import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

axios.defaults.baseURL = "http://localhost";

function Login() {
  const loginClient = async (data) => {
    try {
      const res = await axios.put("/client", data);

      const accessToken = res.data.token;
      console.log(accessToken);
    } catch (error) {
      const err = error.response.data;

      if (err.errorCode) {
        switch (err.errorCode) {
          case "WRONG_PASSWORD":
            alert("잘못된 비밀번호입니다.");
            break;
          case "EMAIL_DOES_NOT_EXISTS":
            alert("가입되지 않은 이메일입니다.");
            break;
        }
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("잘못된 이메일 주소 입니다.")
        .required("이메일 주소를 입력해주세요."),
      password: Yup.string()
        .min(4, "4자 이상 작성해주세요.")
        .required("비밀번호를 입력해주세요."),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      loginClient(values);
    },
  });

  return (
    <div>
      <div className="logo">'GOD생'살기</div>
      <form onSubmit={formik.handleSubmit}>
        <input
          className="inputForm notoSans"
          id="email"
          type="email"
          placeholder="이메일 주소"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="errorEmail notoSans">{formik.errors.email}</div>
        ) : formik.touched.email ? (
          <div className="correctEmail notoSans">유효한 이메일 입니다.</div>
        ) : null}
        <input
          className="inputForm notoSans"
          id="password"
          name="password"
          type="text"
          placeholder="비밀번호"
          onChange={formik.handleChange}
          value={formik.values.password}
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="errorPw notoSans">{formik.errors.password}</div>
        ) : null}

        <button className="verify-btn notoSans" type="submit">
          로그인
        </button>
        <div className="forgot-pw notoSans">계정을 잃어버리셨나요?</div>
        <Link
          to="/signup"
          style={{ textDecoration: "none", color: "rgba(129, 129, 129, 1)" }}
        >
          회원가입
        </Link>
      </form>
    </div>
  );
}

export default Login;
