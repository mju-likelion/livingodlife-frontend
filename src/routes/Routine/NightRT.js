import React from "react"
// import './NightRT.scss'
import Alarm from '../../image/icon-alarm.png';


function NightRT () {

  const routineDone = e => {
    const selectedItem = document.querySelector('.rtDone');
    console.log(e.target.className);
    if(e.target.className=='card') {
      e.target.className='card rtDone';
      selectedItem.classList.add('.rtDone')
    }
  }

    const NightRTData = [
      {
        "id":"1" , 
        "routine_icon":"💻", 
        "routine_title":"매일밤 블로그 업로드", 
        "routine_streaks":"4일째🚶",
        "card_alarm":"10:00PM"
      },

      {
        "id":"2" , 
        "routine_icon":"🧘‍♀️", 
        "routine_title":"자기 전 스트레칭하기", 
        "routine_streaks":"33일째🚙",
        "card_alarm":"10:30PM"
      },

      // {
      //   "id":"3" , 
      //   "routine_icon":"🥗", 
      //   "routine_title":"건강한 아침밥 먹기", 
      //   "routine_streaks":"67일째🔥",
      //   "card_alarm":"6:30AM"
      // }

    ];



  return (
    <>

      { NightRTData.map((card)=>{
        return (
          <ul className="card" onClick={routineDone}>
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
          )
      })}

    </>
  )
}

export default NightRT;