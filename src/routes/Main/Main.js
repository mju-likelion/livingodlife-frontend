import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Main.scss';
import Header from "../../Components/Header/Header";
import img10 from '../../image/image 10.png';
import blog from '../../image/blog.png';
import running from '../../image/running.png';
import Modal from "../../Components/Modal/Modal";
import search from "../../image/search_icon.png";
import axios from "axios";
import async from "async";

function Main() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const [feedList, setFeedList] = useState([]);

  useEffect(() => {

    axios
      .get("/feed", {
        headers: {
          Authorization: localStorage.getItem("login-token"),
        },
      })
      .then(async (response) => {
        const mainData = response.data;
        const list = [];

        console.log(mainData);

        for (const data of mainData) {
          const date = new Date(data.dateCreated);
          const { url } = (await axios.get(`/file/${data.imageUrl}`)).data;

          list.push(
            <div className="Main GmarketS">
              <div className="Date GmarketM">{date.toDateString()}</div>
              <img className="Picture" src={url}></img>
              <div className="Profile">
                <div className="ProfileImage"></div>
                <div className="ProfileInfo GmarketS">
                  {data.authorName}
                </div>
              </div>
              <div className="ProfileCont GmarketS">
                <div className="Write GmarketS">
                  {data.certifyingContents}
                </div>
              </div>
              <div className="Option GmarketS">
                <p className>좋아요</p>
                <p className>공유</p>
              </div>
            </div>
          );
        }
        console.log(list);
        setFeedList(list);
      });
  }, []);

  /*const MainData = [
    {
      "Date":"2022.08.05",
      "Picture":<img className='Picture' src={running} id='running'></img> ,
      "ProfileImage":<img src={img10} id='img10'></img>,
      "ProfileInfo": "김민규",
      "Write": "오늘은 운동을 30분 했다." 
    },

    {
      "Date":"2022.08.04",
      "Picture":<img className="Picture" src={blog} id='blog'></img>,
      "ProfileImage":<img src={img10} id='img10'></img>,
      "ProfileInfo":"김민규",
      "Write": "매일 배운것을 블로그에 정리한지 한달째" 
    }

  ];*/

  return (
    <><>
      <Header />
      <div className="BackGround">
        {feedList}
      </div>
      <button className="FriendBtn" onClick={openModal}>친구추가 <div id='popup'></div>
      </button>
    </><Modal open={modalOpen} close={closeModal} title="친구추가">
        <div className="FriendBack">
          <input className="FriendSearch" type="text" name="title" placeholder="이름을 검색하세요"></input>
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
