import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import "./Challenge.scss";
import Header from "../../Components/Header/Header";
import imgArrow from '../../image/icon_arrow.png';
import Modal from "../../Components/Modal/Modal";



function Challenge() {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Header />
      <div id="wrapContent">
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
          <tbody>
            <tr className="challengeList">
              <td>1</td>
              <td>오늘 하루 운동 30분</td>
              <td>
                <button className="challengeBtn GmarketM">도전!</button>
              </td>
            </tr>
            <tr className="challengeList">
              <td>2</td>
              <td>오늘 하루 운동 30분</td>
              <td>
                <button className="challengeBtn GmarketM">도전!</button>
              </td>
            </tr>
          </tbody>
          </table>
        </div>
        <button className="GmarketS startBtn" onClick={openModal} >새로운 도전!<div id='circle'><img src={imgArrow} id='imgArrow'></img>
        </div>
        
        </button>
        <Modal open={modalOpen} close={closeModal} title="새로운 도전하기" button="등록하기">
          <p>새로운 챌린지를 추가해보세요!</p>
          <h3 className="modalTitle">카테고리 선택</h3>
          <button className="type">식사</button>
          <button className="type">운동</button>
          <button className="type">취침</button>
          <button className="type">공부</button>
          <button className="type">아침</button>
          <button className="type">계획</button>
          <h3 className="modalTitle">도전 제목</h3>
          <input type="text" name="name" value="제목 입력"></input>
        </Modal>
      </div>
    </>
  );
}

export default Challenge;
