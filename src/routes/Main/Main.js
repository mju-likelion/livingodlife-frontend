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
              <div className="Profile">
              <img className="Picture" src={url}></img>
                <div className="ProfileImage"></div>
                <div className="ProfileInfo GmarketM">
                  {data.authorName}
                </div>
                <div className="ProfileCont GmarketS">
                <div className="Write GmarketS">
                  {data.certifyingContents}
                </div>
              </div>
              <div className="Option GmarketS">
                <button className="optionBtn GmarketS">❤ 0</button>
                {/*<button className="optionBtn GmarketS">공유</button>*/}
              </div>
              </div>
            </div>
          );
        }
        console.log(list);
        setFeedList(list);
      });
  }, []);

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
          <input className="FriendSearch GmarketS" type="text" name="title" placeholder="이름을 검색하세요"></input>
          <div className="Friend">
            <div className="FriendImage"></div>
            <table className="FriendInfo GmarketS">
              <tr>
              <td>박원호</td>
              <td><button className="FriendBtn GmarketM">친구 추가</button></td>
              </tr>
              <tr>
              <td>윤혜민</td>
              <td><button className="FriendBtn GmarketM">친구 추가</button></td>
              </tr>
              <tr>
              <td>김민규</td>
              <td><button className="FriendBtn GmarketM">친구 추가</button></td>
              </tr>
            </table>
          </div>
        </div>
      </Modal></>
  );
}


export default Main;
