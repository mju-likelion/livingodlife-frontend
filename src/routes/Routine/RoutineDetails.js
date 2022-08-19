import React, { useEffect, useState } from "react";
import "./RoutineDetails.scss";
import Alarm from "../../image/icon-alarm.png";
import Pic1 from "../../image/profile_pic1.jpg";
import Pic2 from "../../image/profile_pic2.jpg";
import Modal from "../../Components/Modal/Modal";
import axios from "axios";
import AddRoutineModal from "./AddRoutine";
import { RoutineCard } from "./RoutineCard";

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

  /**
   *
   * @param {*} e
   * @param {{_id: string}} card
   */
  const routineDone = async (e, card) => {
    //const selectedItem = document.querySelector(".rtDone");
    console.log(e.target.className);

    try {
      const token = localStorage.getItem("login-token");
      console.log(token);

      const res = await axios.post(
        `/routine/complete/${card._id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res);
      window.location.reload();
      e.target.className = "doneClick routineCardWrapper rtDone";
    } catch (err) {
      console.log(err);
    }

    //selectedItem.classList.add("doneClick");
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
      .then(async (res) => {
        const { data } = res;
        const pushRoutines = [];

        for (const routine of data.routines) {
          const res = await axios.get(`/routine/accumlate/${routine._id}`, {
            headers: { Authorization: localStorage.getItem("login-token") },
          });

          console.log(res);

          pushRoutines.push({
            ...routine,
            streak: res.data?.contentCount ?? 0,
          });
        }

        setRoutines(pushRoutines);
      });
  }, []);

  return (
    <>
      <div className="card_scroller">
        <div className="card_wrapper">
          {routines.map((card) => (
            <RoutineCard
              card={card}
              openModal={openModal}
              routineDone={routineDone}
            />
          ))}

          <ul className="card">
            <li className="card_body">
              <button
                disabled={isDisabled}
                className="doneClick"
                onClick={() => {
                  // Open Modal
                  setAddModalOpen(true);
                  setIsDisabled(true);
                }}
              >
                <div className="routine_info">
                  <dt className="routine_title">+</dt>
                </div>
              </button>
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
          이 루틴을 {selectedCard.streak}일째 진행중입니다.
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
