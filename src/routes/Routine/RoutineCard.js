import "./RoutineDetails.scss";
import Alarm from "../../image/icon-alarm.png";
import { useLongPress } from "use-long-press";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

/**
 *
 * @param {{card: {_id: string, routineName: string, streak: number}, routineDone: () => void, openModal: () => void}} param0
 * @returns
 */
export function RoutineCard({ card, routineDone, openModal }) {
  const [doneMark, setDoneMark] = useState(false);

  const longPress = useLongPress(() => {
    openModal(card);
  });

  const checkDoneFetch = async () => {
    const token = localStorage.getItem("login-token");
    const { id } = jwtDecode(token);

    try {
      const res = await axios.get(`/routine/complete/${card._id}/${id}`, {
        headers: { Authorization: token },
      });

      const { completed } = res.data;

      setDoneMark(completed);
    } catch (err) {
      console.log(err);
    }
  };

  const card_data = useMemo(() => RoutineCard(card), [card]);

  useEffect(() => {
    checkDoneFetch();
  });

  return (
    <>
      <ul className="card">
        <li className="card_body" key={card._id}>
          <div
            className={`doneClick routineCardWrapper${doneMark ? " rtDone" : ""
              }`}
            onClick={(e) => {
              routineDone(e, card);
            }}
            {...longPress()}
          >
            <div className="routine_icon">{"🔥"}</div>
            <div className="routine_info">
              <div className="routine_title">{card_data.routineName}</div>
              <div className="routine_streaks">{`${card_data.streak}일째`}</div>
            </div>
          </div>
        </li>
        <div className="card_alarm">
          <img src={Alarm} className="alarm_img" />
          {new Date(card_data.routinePlan).toLocaleTimeString()}
        </div>
      </ul>
    </>
  );
}
