import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ChallengePost.scss";
import Header from "../../Components/Header/Header";
import imgArrow from "../../image/icon_arrow.png";
import Modal from "../../Components/Modal/Modal";
import imgUpload from "../../image/icon_upload.png";
import axios from "axios";

function ChallengePost() {
  const [modalOpen, setModalOpen] = useState(false);
  const [files, setFiles] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onLoadFile = (e) => {
    setFiles(e.target.files);
  };

  useEffect(() => {
    preview();

    return () => preview();
  });

  const preview = () => {
    if (!files) return false;

    const img = document.querySelector(".fileImage");

    const reader = new FileReader();

    reader.onload = () => (img.style.backgroundImage = `url(${reader.result})`);

    reader.readAsDataURL(files[0]);
  };

  const handleClick = (e) => {
    const formdata = new FormData();
    formdata.append("uploadImage", files[0]);

    const config = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios.post(`api`, formdata, config);
  };

  return (
    <>
      <Header />
      <div className="wrapContent">
        <div className="wrapCert">
          <div className="listCert">
            <h1 className="certTitle GmarketS">오늘 하루 운동 30분</h1>
            <p className="certCont GmarketS">박원호</p>
            <div className="imgCert">
              <img src={imgUpload}></img>
              <p className="certTime GmarketS">11:30 AM</p>
            </div>
            <p className="certCont GmarketS">오늘도 열심히 워킹 ^^</p>
          </div>
          <button className="GmarketS certBtn" onClick={openModal}>
            나도 인증!
            <div id="circle">
              <img src={imgArrow} id="imgArrow"></img>
            </div>
          </button>
        </div>
        <div className="wrapRank">
            <h1 className="rankTitle GmarketS">Ranking</h1>
            <div>
              <div className="rankContent">
              <table>
            <thead>
            <tr className="rankNav GmarketS">
              <th>No.</th>
              <th>Name</th>
              <th>Period</th>
            </tr>
          </thead>
          <tbody>
            <tr className="rankList GmarketS">
              <td>🥇</td>
              <td>윤혜민</td>
              <td>116일</td>
            </tr>
            <tr className="rankList GmarketS">
              <td>🥈</td>
              <td>김민규</td>
              <td>100일</td>
            </tr>
            <tr className="rankList GmarketS">
              <td>🥉</td>
              <td>강민지</td>
              <td>98일</td>
            </tr>
            </tbody>
            </table>
            </div>
            </div>
          </div>
        <Modal open={modalOpen} close={closeModal} title="인증하기">
          <p className="modalCont">여러분의 사진을 업로드 해보세요!</p>
          <div className="wrapImage">
            <div className="fileImage"></div>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={onLoadFile}
            ></input>
          </div>
          <textarea
            name="cont"
            className="inputCont GmarketS"
            rows="3"
            placeholder="본문을 입력해 주세요"
          ></textarea>
          <footer>
            <button className="uploadBtn GmarketS" onClick={handleClick}>
              {" "}
              업로드 !
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

export default ChallengePost;
