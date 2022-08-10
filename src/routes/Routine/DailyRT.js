import React from "react";
import Alarm from "../../image/icon-alarm.png";

function DailyRT () {
  const routineDone = (e) => {
    const selectedItem = document.querySelector('.rtDone');
      console.log(e.target.className);
      if(e.target.className=="doneClick") {
        e.target.className="doneClick rtDone";
      selectedItem.classList.add("doneClick")
    } else {
      e.target.className="doneClick";
    }
  };

    const DailyRTData = [
      {
        id:"1" , 
        routine_icon:"💪", 
        routine_title:"운동 최소 30분 하기", 
        routine_streaks:"63일째🔥",
      },
    ];

  return (
    <>
      <div className="card_scroller">
        <div className="card_wrapper">
          {DailyRTData.map((card)=>{
            return (
              <ul className="card">
                <li className="card_body" key={card.id}>
                  <div className="routine_icon">{card.routine_icon}</div>
                  <dl>
                    <dt className="routine_title">{card.routine_title}</dt>
                    <dd className="routine_streaks">{card.routine_streaks}</dd>
                    <div className="doneClick" onClick={routineDone}></div>
                  </dl>
                </li>
              </ul>
          );
        })}
      </div>
    </div>
  </>
  );
}

export default DailyRT;
