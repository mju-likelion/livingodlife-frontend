import React, { useState, useEffect } from "react";
import "./Challenge.scss";
import Header from "../../Components/Header/Header";
import imgArrow from "../../image/icon_arrow.png";
import Modal from "../../Components/Modal/Modal";
import axios from "axios";
import { Link } from "react-router-dom";

axios.defaults.baseURL = "https://api.livingodlife.com";

function Challenge() {
  const [ChallengeList, setChallengeList] = useState([]);
  const [challenge, setChallenge] = useState({
    challengeName: "",
    challengeContents: "내용",
    challengeCategory: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const typeName = [
    "🥗 식사",
    "💪 운동",
    "🛏 취침",
    "📍 계획",
    "✍ 공부",
    "☀ 아침",
  ];
  const [clicked, setClicked] = useState(false);
  const [selectedType, setSelectedType] = useState();
  
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setClicked(false);
  };

  useEffect(() => {
    axios
      .get("/challenge", {
        headers: {
          Authorization: localStorage.getItem("login-token"),
        },
      })
      .then((response) => {
        const challengeData = response.data;
        const list = challengeData.map((data, index) => (
          <tr className="challengeList" key={index}>
            <td>{index + 1}</td>
            <td>{data.challengeCategory}</td>
            <td>{data.challengeName}</td>
            <td>
              <button
                className="challengeBtn GmarketM"
              >
                <Link
                  to={`/challenge/${data._id}`}
                  style={{ textDecoration: "none", color: "white" }}
                  state={{ title: data.challengeName }}
                >
                  도전!
                </Link>
              </button>
            </td>
          </tr>
        ));
        setChallengeList(list);
      });
  }, []);

  const onChangeContent = (e) => {
    setChallenge({
      ...challenge,
      [e.target.name]: e.target.value,
    });
  };

  const addChallenge = async (data) => {
    try {
      await axios.post("/challenge", {
        challengeName: data.challengeName,
        challengeContents: "내용",
        challengeCategory: selectedType,
      }, {
        headers: {
          Authorization: localStorage.getItem("login-token"),
        },
      });
      alert("챌린지가 추가 되었습니다.");
    } catch (error) {
      const err = error.response.data;
      if (err.errorCode) {
        switch (err.errorCode) {
          case "CHALLENGE_ALREADY_EXISTS":
            alert("이미 존재하는 챌린지입니다.");
            break;
        }
      }
      console.log(err);
    }
  };

  const onChallengeSubmit = async () => {
    await addChallenge(challenge);
    setModalOpen(false);
  };

  const handleActive = (e) => {
    if (e.target.className == "GmarketS type") {
      if(clicked==true){
        const selectedItem = document.querySelector(".clicked");
        selectedItem.classList.remove("clicked");
        selectedItem.classList.add("type");
        setClicked(false);
      }
      setClicked(true);
      e.target.className = "GmarketS clicked";
      setSelectedType(e.target.innerText);
    } else {
      e.target.className = "GmarketS type";
      setClicked(false);
    }
  };

  const typeList = typeName.map((type, index) => (
    <button className="GmarketS type" onClick={handleActive} key={index}>
      {type}
    </button>
  ));

  return (
    <>
      <Header />
      <div className="wrapContent">
        <h1 className="challengeTitle GmarketS">Challenge</h1>
        <div className="challengeContent GmarketM">
          <table className="challengeTable">
            <thead>
              <tr className="challengeNav">
                <th>No.</th>
                <th>Category</th>
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
            <img src={imgArrow} alt="imgArrow" id="imgArrow"></img>
          </div>
        </button>
        <Modal open={modalOpen} close={closeModal} title="새로운 도전하기">
          <p className="modalCont">새로운 챌린지를 추가해보세요!</p>
          <h3 className="modalTitle">카테고리 선택</h3>
          <div>{typeList}</div>
          <h3 className="modalTitle">도전 제목</h3>
          <div>
            <input
              className="inputTitle GmarketS"
              type="text"
              id="challengeName"
              name="challengeName"
              placeholder="챌린지 제목을 입력하세요"
              onChange={onChangeContent}
            />
            <button
              type="submit"
              className="regBtn GmarketS"
              onClick={onChallengeSubmit}
            >
              {" "}
              등록하기
              <div id="circle">
                <img src={imgArrow} id="imgArrow"></img>
              </div>
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Challenge;
