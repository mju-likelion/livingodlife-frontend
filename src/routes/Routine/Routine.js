import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Routine.scss';
import Header from "../../Components/Header/Header";
import MorningRT from "./MorningRT.js"
import NightRT from "./NightRT.js"
import DailyRT from "./DailyRT.js"


function Routine() {

  const Progress = ({ done }) => (
    <div className="progress">
      <div className="progress-done" style={{opacity: 1, width:`${done}%`}}>
        { done }%
      </div>
    </div>
  )

  return (
    <>
    <Header/>

    <Progress done="10" />

    {/* <div className="progress-bar">0%</div> */}
    {/* 일단 생김새(?)만 보려고 잠깐 놔둔거고 바꿀꺼에요 */}
    

    <h1 className="routine">Morning Routine</h1>
      <MorningRT />
    <h1 className="routine">Night Routine</h1>
      <NightRT />
    <h1 className="routine">Daily routine</h1>
      <DailyRT />




    </>
  );
}

export default Routine;
