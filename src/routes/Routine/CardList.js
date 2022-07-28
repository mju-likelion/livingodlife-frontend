import React from "react"
import './CardList.scss'
import Alarm from '../../image/icon-alarm.png';

function CardList () {
  return (
    <>
    <div className="card">
      <div className="card_body">
        <div className="routine-icon">🛏</div>
        <div>
          <div className="routine_title">매일 아침 이불 정리</div>
          <div className="routine_streaks">15일째🏃‍♀️</div>
        </div>
      </div>
      <div className="card_alarm">
          <img src={Alarm} className="alarm"/>
          6:00 AM
      </div>
    </div>
    </>
  )
}

export default CardList;