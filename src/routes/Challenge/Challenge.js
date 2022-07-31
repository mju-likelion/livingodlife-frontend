import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import "./Challenge.scss";
import Header from "../../Components/Header/Header";
import imgArrow from '../../image/icon_arrow.png';
import Modal from "../../Components/Modal/Modal";

function Challenge() {

  const [modalOpen, setModalOpen] = useState(false);
  const typeName = ["🥗 식사","💪 운동","🛏 취침","📍 계획","✍ 공부","☀ 아침"];

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleActive= (e) =>{
    const selectedItem = document.querySelector('.clicked');
    console.log(e.target.className);
    if(e.target.className=='GmarketS type'){
      e.target.className='GmarketS clicked';
      selectedItem.classList.remove('clicked');
      selectedItem.classList.add('type');
    }
    else{
      e.target.className='GmarketS type';
    }

  }

  const typeList = typeName.map((type) => (<button className="GmarketS type" onClick={handleActive} >{type}</button>))
  
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
                <button className="challengeBtn GmarketM"><Link to={'challengepost'} style={{ textDecoration: 'none', color:'white'}}>도전!</Link></button>
              </td>
            </tr>
            <tr className="challengeList">
              <td>2</td>
              <td>오늘 하루 운동 30분</td>
              <td>
                <button className="challengeBtn GmarketM"><Link to={'challengepost'} style={{ textDecoration: 'none', color:'white'}}>도전!</Link></button>
              </td>
            </tr>
          </tbody>
          </table>
        </div>
        <button className="GmarketS newBtn" onClick={openModal} >새로운 도전!<div id='circle'><img src={imgArrow} id='imgArrow'></img></div>
        </button>
        <Modal open={modalOpen} close={closeModal} title="새로운 도전하기">
          <p className="modalCont">새로운 챌린지를 추가해보세요!</p>
          <h3 className="modalTitle">카테고리 선택</h3>
          <div>
          {typeList}
          </div>
          <h3 className="modalTitle">도전 제목</h3>
          <input className="inputTitle GmarketS" type="text" name="title" placeholder="챌린지 제목을 입력하세요"></input>
          <footer>
            <button className="regBtn GmarketS"> 등록하기
              <div id='circle'><img src={imgArrow} id='imgArrow'></img></div>
            </button>
          </footer>
        </Modal>
      </div>
    </>
  );
}

export default Challenge;
