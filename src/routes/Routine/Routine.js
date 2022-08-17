import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Routine.scss";
import Header from "../../Components/Header/Header";
import running from "../../image/running-icon.png";

import RoutineDetails from "./RoutineDetails";

function Routine() {
  const Progress = ({ done }) => (
    <div className="progress">
      <div className="progress-done" style={{ width: `${done}%` }}>
        <img
          src={running}
          style={{ width: "50px", float: "right", margin: "-6px -20px" }}
        />
        <br />
        <br />
        {done}%
      </div>
    </div>
  );

  const [count, setCount] = useState(25);

  function addCount() {
    setCount((prevCount) => prevCount + 10);
    if (count >= 100) {
      setCount(100);
    }
  }

  return (
    <div className="routineWropContent">
      <Header />
      <Progress done={count} />
      <h1 className="routine" onClick={() => addCount}>
        Morning Routine
      </h1>
      <div className="routineDiv">
        <RoutineDetails routineType={"Morning"} />
        <h1 className="routine">Night Routine</h1>
        <RoutineDetails routineType={"Night"} />
        <h1 className="routine">Daily routine</h1>
        <RoutineDetails routineType={"Daily"} />
      </div>
    </div>
  );
}

export default Routine;
