import React, { useState } from "react"
import './MorningRT.scss'
import Alarm from '../../image/icon-alarm.png';


function MorningRT () {

  const routineDone = e => {
    const selectedItem = document.querySelector('.rtDone');
    console.log(e.target.className);
    if(e.target.className=='doneClick') {
      e.target.className='doneClick rtDone';
      selectedItem.classList.add('doneClick')
    }
    else {
      e.target.className='doneClick';
    }
  }



    const MorningRTData = [
      {
        "id":"1" , 
        "routine_icon":"🛏", 
        "routine_title":"매일 아침 이불 정리하기", 
        "routine_streaks":"15일째🏃‍♀️",
        "card_alarm":"6:00AM"
      },
      {
        "id":"2" , 
        "routine_icon":"💧", 
        "routine_title":"눈 뜨자마자 물 한컵", 
        "routine_streaks":"51일째🔥",
        "card_alarm":"6:10AM"
      },
      {
        "id":"3" , 
        "routine_icon":"🥗", 
        "routine_title":"건강한 아침밥 먹기", 
        "routine_streaks":"67일째🔥",
        "card_alarm":"6:30AM"
      }
    ];

  return (
    <>
      { MorningRTData.map((card)=>{
        return (
          <>
          <ul className="card">
            <li className="card_body" key={card.id}>
              <div className="routine_icon">{card.routine_icon}</div>
              <dl>
                <dt className="routine_title">{card.routine_title}</dt>
                <dd className="routine_streaks">{card.routine_streaks}</dd>
                <div className="doneClick" onClick={routineDone}></div>
              </dl>
            </li>
            <div className="card_alarm">
              <img src={Alarm} className="alarm" />{card.card_alarm}
            </div>
          </ul>
          </>
          )
      })}
    </>
  )
}

export default MorningRT;
