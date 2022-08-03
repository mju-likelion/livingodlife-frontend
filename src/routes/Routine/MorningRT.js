import React, { useState } from "react"
import './MorningRT.scss'
import Alarm from '../../image/icon-alarm.png';
import DONE from '../../image/DONE.png';


function MorningRT () {

  // const [ rtdone, setRtDone ] = useState()
  // function routineDone() {
  //   setRtDone(<img src={DONE}
  //     style={{ width: '380px', height:'140px'}
  //   }/>)
  //   document.getElementById("done_btn").style.opacity = "0.5";
  // };
  // DONE을 과감하게 포기해봤습니다..


  // const routineDone = e => {
  //   const selectedItem = document.querySelector('.testest');
  //   console.log(e.target.className);
  //   if(e.target.className=='card') {
  //     e.target.className='card testest';
  //     selectedItem.classList.add('.testest')
  //   }
  // }

  const routineDone = e => {
    const selectedItem = document.querySelector('.rtDone');
    console.log(e.target.className);
    if(e.target.className=='card') {
      e.target.className='card rtDone';
      selectedItem.classList.add('.rtDone')
    }
  }



    const MorningRTData = [
      {
        "id":"1" , 
        "routine_icon":"🛏", 
        "routine_title":"매일 아침 이불 정리", 
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
          <ul className="card" onClick={routineDone}>
          {/* <span>{rtdone}</span> */}
            <li className="card_body" key={card.id}>
              <div className="routine_icon">{card.routine_icon}</div>
              <dl>
                <dt className="routine_title">{card.routine_title}</dt>
                <dd className="routine_streaks">{card.routine_streaks}</dd>
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