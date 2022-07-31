import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ChallengePost.scss";
import Header from "../../Components/Header/Header";
import imgArrow from "../../image/icon_arrow.png";
import Modal from "../../Components/Modal/Modal";
import axios from 'axios';

function ChallengePost() {
  const [modalOpen, setModalOpen] = useState(false);
  const [files, setFiles] = useState('');

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onLoadFile = (e) => {
    setFiles(e.target.files);
    console.log(e.target.files);
  }

  useEffect(()=>{
    preview();

    return() =>preview();
  })

  const preview = () => {
    if (!files) return false;

    const img = document.querySelector('.fileImage');

    const reader = new FileReader();

    reader.onload=()=>
    (img.style.backgroundImage = `url(${reader.result})`);

    reader.readAsDataURL(files[0]);
  }

  const handleClick = (e) => {
    const formdata = new FormData();
    formdata.append('uploadImage', files[0]);

    const config = {
        Headers: {
            'content-type' : 'multipart/form-data',
        },
    };

    axios.post(`api`, formdata, config);
  };

  return (
    <>
      <Header />
      <div id="wrapContent">
        <button className="GmarketS startBtn" onClick={openModal}>
          나도 인증! 
          <div id="circle">
            <img src={imgArrow} id="imgArrow"></img>
          </div>
        </button>
        <Modal
          open={modalOpen}
          close={closeModal}
          title="인증하기"
        >
          <p className="modalCont">여러분의 사진을 업로드 해보세요!</p>
          <div className="wrapImage">
            <div className="fileImage">
            </div>
            <input type="file" id="image" accept="image/*" onChange={onLoadFile}></input>
          </div>
          <textarea name="cont" className="inputCont GmarketS" rows="3" placeholder="본문을 입력해 주세요"></textarea>
          <footer>
            <button className="uploadBtn GmarketS" onClick={handleClick}> 업로드 !
              <div id='circle'><img src={imgArrow} id='imgArrow'></img></div>
            </button>
          </footer>
        </Modal>
      </div>
    </>
  );
}

export default ChallengePost;
