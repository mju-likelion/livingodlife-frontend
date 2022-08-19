import { useState } from "react";
import Modal from "../../Components/Modal/Modal";

import Pic1 from "../../image/profile_pic1.jpg";
import Pic2 from "../../image/profile_pic2.jpg";

export function RoutineModal({ closeModal, id }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [routineData, setRoutineData] = useState({
    routineName: "",
    routineContents: "",
    routinePlan: new Date(),
    streak: 0,
  });

  const repeatDetail = () => {};

  return (
    <Modal
      open={modalOpen}
      close={closeModal}
      key={id}
      title={routineData.routineName}
    >
      <div className="streaks_detail">
        이 루틴을 {routineData.streak}일째 진행중입니다.
      </div>
      <br />
      <table className="routine_detail" border={0}>
        <tr className="resolution">
          <td className="resolution_title">{routineData.routineName}</td>
          <td className="resolution_detail">{routineData.routineContents}</td>
        </tr>
        <tr className="alarm">
          <td className="alarm_title">🔔알람 설정</td>
          <td className="alarm_detail">
            {new Date(routineData.routinePlan).toLocaleTimeString()}
          </td>
        </tr>
        <tr className="repeat">
          <td className="repeat_title">🗓요일 설정</td>
          <td className="repeat_detail">
            <div className="button_wrap">
              <button className={`Sun`} onClick={repeatDetail}>
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
  );
}
