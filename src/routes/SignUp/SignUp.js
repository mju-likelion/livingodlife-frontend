import "./SignUp.scss";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

axios.defaults.baseURL = "http://localhost";

function SignUp() {
  const signUpClient = async (data) => {
    try {
      const res = await axios.post("/client", data);
      alert("회원가입이 완료되었습니다.");
    } catch (error) {
      const err = error.response.data;
      if (err.errorCode) {
        switch (err.errorCode) {
          case "EMAIL_ALREADY_EXISTS":
            alert("이미 존재하는 이메일 입니다.");
            break;
          case "NAME_ALREADY_EXISTS":
            alert("이미 존재하는 이름입니다.");
            break;
        }
      }
      console.log(err);
      console.log(data);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(20, "20자 이하로 입력해주세요"),
      email: Yup.string()
        .email("잘못된 이메일 주소 입니다.")
        .required("이메일 주소를 입력해주세요."),
      password: Yup.string()
        .min(6, "6자 이상 작성해주세요.")
        .required("비밀번호를 입력해주세요."),
      passwordCheck: Yup.string()
        .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
        .required("비밀번호를 확인해주세요."),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      signUpClient(values);
    },
  });

  return (
    <div>
      <div className="logo">'GOD생'살기</div>
      <form onSubmit={formik.handleSubmit}>
        <input
          className="inputForm notoSans"
          id="name"
          type="name"
          placeholder="이름"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="errorEmail notoSans">{formik.errors.name}</div>
        ) : null}
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
        <input
          className="inputForm notoSans"
          id="passwordCheck"
          name="passwordCheck"
          type="text"
          placeholder="비밀번호 확인"
          onChange={formik.handleChange}
          value={formik.values.passwordCheck}
          {...formik.getFieldProps("passwordCheck")}
        />
        {formik.touched.passwordCheck && formik.errors.passwordCheck ? (
          <div className="errorPw notoSans">{formik.errors.passwordCheck}</div>
        ) : formik.touched.passwordCheck ? (
          <div className="correctPw notoSans">비밀번호가 일치합니다.</div>
        ) : null}
        <button className="verify-btn notoSans" type="submit">
          회원가입 완료
        </button>
      </form>
    </div>
  );
}

export default SignUp;
