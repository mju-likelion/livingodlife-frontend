import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Challenge.scss";
import Header from "../../Components/Header/Header";
import imgArrow from '../../image/icon_arrow.png';


function Challenge() {
  return (
    <>
      <Header />
      <div id="wrapContent">
        <h1 className="challengeTitle GmarketS">Challenge</h1>
        <div className="challengeContent GmarketM">
            <table>
          <thead>
            <tr className="challengeNav ">
              <th>No.</th>
              <th>Title</th>
              <th>Challenge</th>
            </tr>
          </thead>
          <tbody>
            <tr className="challengeList">
              <td>1</td>
              <td>오늘 하루 운동 30분</td>
              <td>
                <button className="challengeBtn GmarketM">도전!</button>
              </td>
            </tr>
            <tr className="challengeList">
              <td>2</td>
              <td>오늘 하루 운동 30분</td>
              <td>
                <button className="challengeBtn GmarketM">도전!</button>
              </td>
            </tr>
          </tbody>
          </table>
        </div>
        <button className="GmarketS startBtn" >새로운 도전!<div id='circle'><img src={imgArrow} id='imgArrow'></img></div></button>
      </div>
    </>
  );
}

export default Challenge;
