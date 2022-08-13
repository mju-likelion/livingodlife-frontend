import React, { useState } from "react";
import "./MorningRT.scss";
import Alarm from "../../image/icon-alarm.png";
import Pic1 from "../../image/profile_pic1.jpg";
import Pic2 from "../../image/profile_pic2.jpg";
import Modal from "../../Components/Modal/Modal";
import axios from "axios";

function MorningRT () {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const routineDone = (e) => {
    const selectedItem = document.querySelector(".rtDone");
    console.log(e.target.className);
    if(e.target.className=="doneClick") {
      e.target.className="doneClick rtDone";
      selectedItem.classList.add("doneClick");
    } else {
      e.target.className="doneClick";
    }
  };

  const repeatDetail = (e) => {
  const selectedItem = document.querySelector("button");
  if(e.target.className=="active") {
    e.target.className="active active2";
    selectedItem.classList.add("active");
  } else {
    e.target.className="active";
  }
};

axios.get("https://api.livingodlife.com/routine").then(
  (e)=>console.log(e)
)

    const MorningRTData = [
      {
        id:"1" , 
        routine_icon:"🛏", 
        routine_title:"매일 아침 이불 정리하기", 
        routine_streaks:"15일째🏃‍♀️",
        card_alarm:"6:00AM",
      },
      {
        id:"2" , 
        routine_icon:"💧", 
        routine_title:"눈 뜨자마자 물 한컵", 
        routine_streaks:"51일째🔥",
        card_alarm:"6:10AM",
      },
      {
        id:"3" , 
        routine_icon:"🥗", 
        routine_title:"건강한 아침밥 먹기", 
        routine_streaks:"67일째🔥",
        card_alarm:"6:30AM",
      }
    ];

  return (
    <>
      <div className="card_scroller">
        <div className="card_wrapper">
        {MorningRTData.map((card)=>{
          return (
            <>
              <ul className="card">
                <li className="card_body" key={card.id}>
                  <div className="routine_icon">{card.routine_icon}</div>
                  <div className="routine_info">
                    <dt className="routine_title">{card.routine_title}</dt>
                    <dd className="routine_streaks">
                      {card.routine_streaks}
                    </dd>
                  </div>

                    <div className="doneClick" ondblClick={routineDone} onClick={openModal}></div>

                    <Modal open={modalOpen} close={closeModal} key={card.id} title={card.routine_title}>
                      <div className="streaks_detail">(사용자)님은 이 루틴을 {card.routine_streaks} 진행중입니다.</div>
                        <br />
                        <table className="routine_detail" border={0}>
                        <tr className="resolution">
                          <td className="resolution_title">💪나의 다짐</td>
                          <td className="resolution_detail">매일 아침 건강식으로 갓생 살아보자! 아자아자! *^0^* </td>
                        </tr>
                        <tr className="alarm">
                          <td className="alarm_title">🔔알람 설정</td>
                          <td className="alarm_detail">{card.card_alarm}</td>
                        </tr>
                        <tr className="repeat">
                          <td className="repeat_title">🗓요일 설정</td>
                          <td className="repeat_detail">
                            <div className="button_wrap">
                            <button className="Sun" onClick={repeatDetail}>S</button>
                            <button className="Mon" onClick={repeatDetail}>M</button>
                            <button className="Tue" onClick={repeatDetail}>T</button>
                            <button className="Wed" onClick={repeatDetail}>W</button>
                            <button className="Thu" onClick={repeatDetail}>T</button>
                            <button className="Fri" onClick={repeatDetail}>F</button>
                            <button className="Sat" onClick={repeatDetail}>S</button>
                            </div>
                          </td>
                        </tr>
                        </table>
                        <br />
                        <div className="followers">함께하고 있는 친구들</div>
                        <img src={Pic1} className="profile_pic1" />
                        <img src={Pic2} className="profile_pic2" />

                    </Modal>
                </li>
                <div className="card_alarm">
                  <img src={Alarm} className="alarm_img" />
                  {card.card_alarm}
                </div>
              </ul>
            </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MorningRT;
