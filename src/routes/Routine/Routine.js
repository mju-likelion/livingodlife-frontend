import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Routine.scss";
import Header from "../../Components/Header/Header";
import running from "../../image/running-icon.png";

import RoutineDetails from "./RoutineDetails";
import axios from "axios";

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

  const fetchRoutineCount = async () => {
    console.log("ㅋ");

    const res = await axios.get("/routine/count/count", {
      headers: {
        Authorization: localStorage.getItem("login-token"),
      },
    });

    const { routineCount, completedRoutineCount } = res.data;
    if (routineCount === 0) {
      setCount(0);
    } else {
      setCount(Math.floor((completedRoutineCount / routineCount) * 100));
    }
  };

  useEffect(() => {
    fetchRoutineCount();
  }, []);

  return (
    <div className="routineWropContent">
      <Header />
      <Progress done={count} />
      <h1 className="routine">Morning Routine</h1>
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
