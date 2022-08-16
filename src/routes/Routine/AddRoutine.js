import "./AddRoutine.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 *
 * @param {{closeModal: ()=>void}} param0
 * @returns
 */
const AddRoutineModal = ({ closeModal }) => {
  const [routineType, setRoutineType] = useState("Morning");
  const [content, setContent] = useState("Content");
  const [name, setName] = useState("Name");
  const [time, setTime] = useState();

  const setTypeToMorning = () => setRoutineType("Morning");
  const setTypeToNight = () => setRoutineType("Night");
  const setTypeToDaily = () => setRoutineType("Daily");

  const contentHandle = (e) => setContent(e.target.value);
  const nameHandle = (e) => setName(e.target.value);
  const timeHandle = (e) => setTime(e.target.value);

  const submit = async () => {
    try {
      const response = await axios.post(
        "/routine",
        {
          routineName: name,
          routineContents: content,
          routineType: routineType,
          routinePlan: `2000/01/01 ${time}`,
        },
        {
          headers: {
            Authorization: localStorage.getItem("login-token"),
          },
        }
      );

      alert("루틴 생성완료!");
      closeModal();
    } catch (e) {
      const { data } = e.response;
      const { errorCode } = data;

      switch (errorCode) {
        case "ROUTINE_NAME_ALREADY_EXISTS":
          alert("이미 존재하는 루틴 이름입니다!");
          break;

        default:
          alert(data.statusCode + "/" + data.errorMsg);
          break;
      }

      console.log(data);
    }
  };

  useEffect(() => {
    console.log(time);
  }, [time]);

  useEffect(() => {
    console.log(localStorage.getItem("login-token"));
  }, []);

  return (
    <>
      <div className="AddRoutineWrap">
        <div className="AddRoutineTypeSelectWrap">
          <div
            className={`AddRoutineTypeSelect ${
              routineType === "Morning" && "AddRoutineTypeSelected"
            }`}
            onClick={setTypeToMorning}
          >
            Morning Routine
          </div>
          <div
            className={`AddRoutineTypeSelect ${
              routineType === "Night" && "AddRoutineTypeSelected"
            }`}
            onClick={setTypeToNight}
          >
            Night Routine
          </div>
          <div
            className={`AddRoutineTypeSelect ${
              routineType === "Daily" && "AddRoutineTypeSelected"
            }`}
            onClick={setTypeToDaily}
          >
            Daily Routine
          </div>
        </div>
        <div className="AddRoutineTimeSelectWrap">
          <p>
            <input id="time" type="time" onChange={timeHandle} />
          </p>
        </div>
        <div className="AddRoutineNameWrap">
          <p>
            <input id="name" type={"text"} onChange={nameHandle} />
          </p>
        </div>
        <div className="AddRoutineContentWrap">
          <p>
            <textarea id="content" onChange={contentHandle} />
          </p>
        </div>
        <div className="AddRoutineSubmitWrap">
          <p>
            <button onClick={submit}>추가하기</button>
          </p>
        </div>
      </div>
    </>
  );
};

export default AddRoutineModal;
