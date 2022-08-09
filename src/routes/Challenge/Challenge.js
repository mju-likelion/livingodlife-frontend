import React, { useState, useEffect } from "react";
import "./Challenge.scss";
import Header from "../../Components/Header/Header";
import imgArrow from "../../image/icon_arrow.png";
import Modal from "../../Components/Modal/Modal";
import axios from "axios";
import { Link } from "react-router-dom";

function Challenge() {
  const [ChallengeList, setChallengeList] = useState([]);
  useEffect(()=>{axios
    .get("/challenge", {
      headers: {
        Authorization: localStorage.getItem("login-token"),
      },
    })
    .then((response) => {
      const challengeData = response.data;
      console.log(challengeData);
      const list = challengeData.map((data,index)=> 
        <tr className="challengeList" key={data.index}>
          <td>{index+1}</td>
          <td>{data.challengeContents}</td>
          <td>
            <button className="challengeBtn GmarketM">
              <Link
                to={"/challenge/:challengeId"}
                style={{ textDecoration: "none", color: "white" }}
              >
                도전!
              </Link>
            </button>
          </td>
        </tr>
    )
    console.log(list);
    setChallengeList(list);
    });
   }, []);
  
  const [modalOpen, setModalOpen] = useState(false);
  const typeName = [
    "🥗 식사",
    "💪 운동",
    "🛏 취침",
    "📍 계획",
    "✍ 공부",
    "☀ 아침",
  ];

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleActive = (e) => {
    const selectedItem = document.querySelector(".clicked");
    console.log(e.target.className);
    if (e.target.className == "GmarketS type") {
      e.target.className = "GmarketS clicked";
      selectedItem.classList.remove("clicked");
      selectedItem.classList.add("type");
    } else {
      e.target.className = "GmarketS type";
    }
  };

  const typeList = typeName.map((type) => (
    <button className="GmarketS type" onClick={handleActive}>
      {type}
    </button>
  ));

  return (
    <>
      <Header />
      <div className="wrapContent">
        <h1 className="challengeTitle GmarketS">Challenge</h1>
        <div className="challengeContent GmarketM">
          <table>
            <thead>
              <tr className="challengeNav ">
                <th>No.</th>
                <th>Title</th>
                <th>Challenge</th>
              </tr>
            </thead>
            <tbody>{ChallengeList}</tbody>
          </table>
        </div>
        <button className="GmarketS newBtn" onClick={openModal}>
          새로운 도전!
          <div id="circle">
            <img src={imgArrow} id="imgArrow"></img>
          </div>
        </button>
        <Modal open={modalOpen} close={closeModal} title="새로운 도전하기">
          <p className="modalCont">새로운 챌린지를 추가해보세요!</p>
          <h3 className="modalTitle">카테고리 선택</h3>
          <div>{typeList}</div>
          <h3 className="modalTitle">도전 제목</h3>
          <input
            className="inputTitle GmarketS"
            type="text"
            name="title"
            placeholder="챌린지 제목을 입력하세요"
          ></input>
          <footer>
            <button className="regBtn GmarketS">
              {" "}
              등록하기
              <div id="circle">
                <img src={imgArrow} id="imgArrow"></img>
              </div>
            </button>
          </footer>
        </Modal>
      </div>
    </>
  );
}

export default Challenge;
