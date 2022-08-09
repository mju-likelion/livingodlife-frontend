import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Main.scss';
import Header from "../../Components/Header/Header";
import img10 from '../../image/image 10.png';
import img23 from '../../image/image 23.png';

function Main() {
  const MainData = [
    {
      "Date":"2022.08.05",
      "Picture": "",
      "ProfileImage":"" ,
      "ProfileInfo":"김민규",
      "Write": "오늘은 운동을 30분 했다." 
    },

    {
      "Date":"2022.08.04",
      "Picture":"" ,
      "ProfileImage":"" ,
      "ProfileInfo":"김민규",
      "Write": "매일 배운것을 블로그에 정리한지 한달째" 
    }

  ];

  return (
    <>
      <Header/>
      {MainData.map((main)=>{
        return (
          <div className="BackGround">
            <div className="Main">
              <div className="Date" key={main.Date}>
                <div className="Date">{main.Date}</div>
                <div className="Picture">{main.Picture}</div>
                <div className="Profile">
                  <div className="ProfileImage">{main.ProfileImage}</div>
                </div>
                <div className="ProfileInfo">{main.ProfileInfo}</div>
                <div className="Write">{main.Write}</div>
                <div className="Option">
                  <span>좋아요</span>
                  <span>공유</span>
              </div>
            </div>
          </div>
        </div>
        )
      })}

      <div className="BackGround">
        <div className="Main">
          <div className="Date">2022.08.06</div>
          <div className="Picture">
            <img src={img23} id='img23'></img>
          </div>
          <div className="Profile">
            <div className="ProfileImage">
              <img src={img10} id='img10'></img>
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
