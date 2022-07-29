import React from "react"
// import './DailyRT.scss'
import Alarm from '../../image/icon-alarm.png';


function DailyRT () {

    const DailyRTData = [
      {
        "id":"1" , 
        "routine_icon":"💪", 
        "routine_title":"운동 최소 30분 하기", 
        "routine_streaks":"63일째🔥",
      }

    ];



  return (
    <>

      { DailyRTData.map((card)=>{
        return (
          <ul className="card">
            <li className="card_body" key={card.id}>
              <div className="routine_icon">{card.routine_icon}</div>
              <dl>
                <dt className="routine_title">{card.routine_title}</dt>
                <dd className="routine_streaks">{card.routine_streaks}</dd>
              </dl>
            </li>
          </ul>
          )
      })}

    </>
  )
}

export default DailyRT;