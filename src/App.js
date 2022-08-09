import React, { Component, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./Components/Header/Header";
import Test from "./routes/Test/Test";
import Login from "./routes/Login/Login";
import SignUp from "./routes/SignUp/SignUp";
import VerifyEmail from "./routes/VerifyEmail/VerifyEmail";
import Main from "./routes/Main/Main";
import Challenge from "./routes/Challenge/Challenge";
import ChallengePost from "./routes/Challenge/ChallengePost";
import Routine from "./routes/Routine/Routine";

const App = () => {
  let isAuthorized = sessionStorage.getItem("isAuthorized");
  console.log(isAuthorized);

  return (
    <div className="App">
      <BrowserRouter>
        {!isAuthorized ?  <Routes to="/" />  : <Routes to="/main" /> }
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>

          <Route path="/main" element={<Main />}/>
          <Route path="/header" element={<Header />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/test" element={<Test />}/>
          <Route path="/routine" element={<Routine />}/>
          <Route path="/challenge" element={<Challenge />}>
            <Route path="/challenge/:challengeId" element={<ChallengePost />} />
          </Route>
          

          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
