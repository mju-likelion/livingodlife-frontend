import React, { useEffect, useState } from "react";
import "./RoutineDetails.scss";
import Alarm from "../../image/icon-alarm.png";
import Pic1 from "../../image/profile_pic1.jpg";
import Pic2 from "../../image/profile_pic2.jpg";
import Modal from "../../Components/Modal/Modal";
import axios from "axios";
import AddRoutineModal from "./AddRoutine";

/**
 *d
 * @param {{routineType: string}} args
 * @returns
 */
function RoutineDetails({ routineType }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const openModal = (card) => {
    setModalOpen(true);
    setSelectedCard(card);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeAddModal = (e) => {
    setAddModalOpen(false);
    setIsDisabled(false);
  };

  const routineDone = (e, card) => {
    const selectedItem = document.querySelector(".rtDone");
    console.log(e.target.className);

    if (e.target.className === "doneClick") {
      e.target.className = "doneClick rtDone";
      selectedItem.classList.add("doneClick");
    } else {
      e.target.className = "doneClick";
    }
  };

  const repeatDetail = (e) => {
    const selectedItem = document.querySelector("button");
    if (e.target.className === "active") {
      e.target.className = "active active2";
      selectedItem.classList.add("active");
    } else {
      e.target.className = "active";
    }
  };

  const [routines, setRoutines] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  useEffect((e) => {
    axios
      .get(`https://api.livingodlife.com/routine/${routineType}`, {
        headers: {
          Authorization: localStorage.getItem("login-token"),
        },
      })
      .then((res) => {
        const { data } = res;
        setRoutines(data.routines);
        console.log(data);
      });
  }, []);

  return (
    <>
      <div className="card_scroller">
        <div className="card_wrapper">
          {routines.map((card) => {
            return (
              <>
                <ul className="card">
                  <li className="card_body" key={card._id}>
                    <div className="routine_icon">{"🔥"}</div>
                    <div className="routine_info">
                      <dt className="routine_title">{card.routineName}</dt>
                      <dd className="routine_streaks">{"20일째"}</dd>
                    </div>

                    <div
                      className="doneClick"
                      ondblClick={routineDone}
                      onClick={() => {
                        openModal(card);
                      }}
                    ></div>
                  </li>
                  <div className="card_alarm">
                    <img src={Alarm} className="alarm_img" />
                    {new Date(card.routinePlan).toLocaleTimeString()}
                  </div>
                </ul>
              </>
            );
          })}

          <ul className="card">
            <li className="card_body">
              <div className="routine_info">
                <dt className="routine_title">+</dt>
              </div>

              <button
                disabled={isDisabled}
                className="doneClick"
                onClick={() => {
                  // Open Modal
                  setAddModalOpen(true);
                  setIsDisabled(true);
                }
                }
              ></button>
            </li>
          </ul>
        </div>
      </div>

      <Modal
        open={modalOpen}
        close={closeModal}
        key={selectedCard._id}
        title={selectedCard.routineName}
      >
        <div className="streaks_detail">
          (사용자)님은 이 루틴을 {0} 진행중입니다.
        </div>
        <br />
        <table className="routine_detail" border={0}>
          <tr className="resolution">
            <td className="resolution_title">{selectedCard.routineName}</td>
            <td className="resolution_detail">
              {selectedCard.routineContents}
            </td>
          </tr>
          <tr className="alarm">
            <td className="alarm_title">🔔알람 설정</td>
            <td className="alarm_detail">
              {new Date(selectedCard.routinePlan).toLocaleTimeString()}
            </td>
          </tr>
          <tr className="repeat">
            <td className="repeat_title">🗓요일 설정</td>
            <td className="repeat_detail">
              <div className="button_wrap">
                <button className="Sun" onClick={repeatDetail}>
                  S
                </button>
                <button className="Mon" onClick={repeatDetail}>
                  M
                </button>
                <button className="Tue" onClick={repeatDetail}>
                  T
                </button>
                <button className="Wed" onClick={repeatDetail}>
                  W
                </button>
                <button className="Thu" onClick={repeatDetail}>
                  T
                </button>
                <button className="Fri" onClick={repeatDetail}>
                  F
                </button>
                <button className="Sat" onClick={repeatDetail}>
                  S
                </button>
              </div>
            </td>
          </tr>
        </table>
        <br />
        <div className="followers">함께하고 있는 친구들</div>
        <img src={Pic1} className="profile_pic1" />
        <img src={Pic2} className="profile_pic2" />
      </Modal>

      <Modal open={addModalOpen} close={closeAddModal} title="루틴 추가하기">
        <AddRoutineModal
          closeModal={() => {
            setAddModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
}

export default RoutineDetails;
