import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Routine.scss';
import Header from "../../Components/Header/Header";
import CardList from "./CardList.js"

function Routine() {
  

  return (
    <>
    <Header/>

    <div className="progress-bar"></div>
    {/* 일단 생김새(?)만 보려고 잠깐 놔둔거고 바꿀꺼에요 */}

    <h1 className="routine">Morning Routine</h1>
      <CardList />
    <h1 className="routine">Night Routine</h1>
      <CardList />
    <h1 className="routine">Daily routine</h1>
      <CardList />




    </>
  );
}

export default Routine;
