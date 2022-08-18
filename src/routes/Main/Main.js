import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Main.scss';
import Header from "../../Components/Header/Header";
import Modal from "../../Components/Modal/Modal";
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
  const [friendList, setFriendList] = useState([]);
  const [inputName, setInputName] = useState("");

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
        setFeedList(list);
      });
  }, []);

  const onChangeName = (e) => {
    setInputName({
      ...inputName,
      [e.target.name]: e.target.value,
    });
    console.log(inputName);
  };

  const frinedNameSubmit = async () => {
    await findFriendList(inputName);
  };

  const findFriendList = async (data) => {
    
    try{
      await axios.get(`/client/name/${data.friendName}`, {
        headers: {
          Authorization: localStorage.getItem("login-token"),
        },
      }).then((response) => {
        const friendData = response.data.client;
        const list = () => (
          <tr>
            <td>{friendData.name}</td>
            <td><button className="FriendBtn GmarketM">친구 추가</button></td>
          </tr>)
        setFriendList(list);
      });
    } catch (error) {
      const err = error.response.data;
      if (err.errorCode) {
        switch (err.errorCode) {
          case "CLIENT_NOT_EXISTS":
            alert("존재하지 않는 유저입니다.");
            break;
        }
      }
      console.log(err);
    }
  };


  {/*useEffect(() => {
    axios
      .get("/friend", {
        headers: {
          Authorization: localStorage.getItem("login-token"),
        },
      })
      .then((response) => {
        const friendData = response.data;
        console.log(friendData);
        const list = friendData.map((data, index) => (
          <tr>
            <td>{data[index]}</td>
            <td><button className="FriendBtn GmarketM">친구 추가</button></td>*
          </tr>
        ));
        setFriendList(list);
      });
  }, []);
*/}

  return (
    <><>
      <Header />
      <div className="BackGround">
        {feedList}
      </div>
      <button className="FriendBtn GmarketS" onClick={openModal}>친구추가 <div id='popup'></div>
      </button>
    </><Modal open={modalOpen} close={closeModal} title="친구추가">
        <div className="FriendBack">
          <input className="FriendSearch GmarketS" type="text"
            id="friendName" name="friendName" placeholder="이름을 검색하세요" onChange={onChangeName}></input>
          <button className="FriendBtn GmarketM" onClick={frinedNameSubmit}>검색</button>
          <div className="Friend">
            <div className="FriendImage"></div>
            <table className="FriendInfo GmarketS">
              <tbody>
              {friendList}
              </tbody>
            </table>
          </div>
        </div>
      </Modal></>
  );
}


export default Main;
