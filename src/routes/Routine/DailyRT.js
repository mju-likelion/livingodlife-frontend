import React from "react"
// import './DailyRT.scss'
import Alarm from '../../image/icon-alarm.png';


function DailyRT () {

  const routineDone = e => {
    const selectedItem = document.querySelector('.rtDone');
    console.log(e.target.className);
    if(e.target.className=='card') {
      e.target.className='card rtDone';
      selectedItem.classList.add('.rtDone')
    }
  }

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
          <ul className="card" onClick={routineDone}>
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