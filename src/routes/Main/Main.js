import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Main.scss';
import Header from "../../Components/Header/Header";


function Main() {
  return (
    <>
      <Header/>
      <div className="BackGround">
        <div className="Main">
          <div className="Date">2022.08.06</div>
          <div className="Picture">
            <img id="study" src="src\image\image 23.png" alt="공부"></img>
          </div>
          <div className="Profile">
            <div className="ProfileImage">
              <img id="image" src="src\image\image 10.png" alt="프사"></img>
            </div>
            <div className="ProfileInfo">
              <p>김민규</p>
              <p>명지대학교 자연캠퍼스 함박관에서 501호에서 스테이크를 구워먹었다</p>
            </div>
          </div>
          <div className="Write">
            <p>오늘은 영단어 30개를 외웠다. 뿌듯하다. 내일은 뿌링클먹어야지</p>
          </div>
          <div className="Option">
            <span>좋아요</span>
            <span>공유</span>
          </div>
        </div>
      </div>
    </>
  );
}


export default Main;
