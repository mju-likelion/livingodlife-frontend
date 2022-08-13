import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import './Main.scss';
import Header from "../../Components/Header/Header";
import img10 from '../../image/image 10.png';
import blog from '../../image/blog.png';
import running from '../../image/running.png';
import Modal from "../../Components/Modal/Modal";


function Main() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const MainData = [
    {
      "Date":"2022.08.05",
      "Picture":<img className='mainImg' src={running} id='running'></img> ,
      "ProfileImage":<img src={img10} id='img10'></img>,
      "ProfileInfo": "김민규",
      "Write": "오늘은 운동을 30분 했다." 
    },

    {
      "Date":"2022.08.04",
      "Picture":<img className='mainImg' src={blog} id='blog'></img>,
      "ProfileImage":<img src={img10} id='img10'></img>,
      "ProfileInfo":"김민규",
      "Write": "매일 배운것을 블로그에 정리한지 한달째" 
    }

  ];

  return (
    <><>
      <Header />
      {MainData.map((main) => {
        return (
          <div className="BackGround">
            <div className="Main">
              <div className="Date">{main.Date}</div>
              <div className="Picture">{main.Picture}</div>
              <div className="Profile">
                <div className="ProfileImage">{main.ProfileImage}</div>
              </div>
              <div className="ProfileInfo">
                {main.ProfileInfo}
              </div>
              <div className="Write">
                {main.Write}
              </div>
              <div className="Option">
                <span>좋아요</span>
                <span>공유</span>
              </div>
            </div>
          </div>
      )})}
          <button className="FriendBtn" onClick={openModal}>친구추가 <div id = 'popup'></div>
          </button>
          </><Modal open={modalOpen} close={closeModal}>
            <div className="FriendBack">
              <input className="FriendSearch" type="text" name="title" placeholder="이름을 검색하세요"></input>
                    <p>박원호</p>
                    <div className="Friend">
                        <div className="FriendImage"><img src={img10} id='img10'></img></div>
                        <div className="FriendInfo">
                            <p>박원호</p>
                            <p>친구가 된지 3일 째</p>
                        </div>
                    </div>
                </div>
          </Modal></>  
  );
}


export default Main;
