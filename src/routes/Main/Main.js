import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Main.scss";
import Header from "../../Components/Header/Header";
import Modal from "../../Components/Modal/Modal";
import axios from "axios";
import async from "async";
import { Comments } from "../../Components/Comments/Comment";

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
  const [likeData, setLikeData] = useState(0);

  const [clientId, setClientId] = useState({
    friend: "",
  });

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

        for (const data of mainData) {
          const date = new Date(data.dateCreated);
          const { url } = (await axios.get(`/file/${data.imageUrl}`)).data;

          const response = await axios.get(`/sympathy/count/${data._id}`, {
            headers: {
              Authorization: localStorage.getItem("login-token"),
            },
          });

          list.push(
            <div className="Main GmarketS">
              <div className="Date GmarketM">{date.toDateString()}</div>
              <div className="Profile">
                <img className="Picture" src={url}></img>
                <div className="ProfileImage"></div>
                <div className="ProfileInfo GmarketM">{data.authorName}</div>
                <div className="ProfileCont GmarketS">
                  <div className="Write GmarketS">
                    {data.certifyingContents}
                  </div>
                </div>
                <div className="Option GmarketS">
                  <button
                    className="optionBtn GmarketS"
                    onClick={() => AddSympathy(data._id)}
                  >
                    ❤ {response.data.likeCount}
                  </button>
                  {/*<button className="optionBtn GmarketS">공유</button>*/}
                </div>
                <Comments contentId={data._id} />
              </div>
            </div>
          );
        }
        setFeedList(list);
      });
  }, []);

  const AddSympathy = async (data) => {
    try {
      await axios
        .post(
          `/sympathy/${data}`,
          {},
          {
            headers: {
              Authorization: localStorage.getItem("login-token"),
            },
          }
        )
        .then(() => {
          alert("좋아요를 눌렀습니다");
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
      const err = error.response.data;
      if (err.errorCode) {
        switch (err.errorCode) {
          case "ALEADY_SELECTED":
            axios
              .delete(`/sympathy/${data}`, {
                headers: {
                  Authorization: localStorage.getItem("login-token"),
                },
              })
              .then((response) => {
                alert("좋아요가 취소되었습니다.");
                window.location.reload();
              });
            break;
        }
      }
    }
  };

  const onChangeName = (e) => {
    setInputName({
      ...inputName,
      [e.target.name]: e.target.value,
    });
  };

  const frinedNameSubmit = async () => {
    await findFriendList(inputName);
  };

  const findFriendList = async (data) => {
    try {
      await axios
        .get(`/client/name/${data.friendName}`, {
          headers: {
            Authorization: localStorage.getItem("login-token"),
          },
        })
        .then((response) => {
          const friendData = response.data.client;
          setClientId({
            friend: friendData._id,
          });
          const list = () => (
            <tr>
              <td>{friendData.name}</td>
              <td>
                <button
                  className="FriendBtn GmarketM"
                  onClick={() => addFriend(friendData._id)}
                >
                  친구 추가
                </button>
              </td>
            </tr>
          );
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
    }
  };

  const addFriend = async (data) => {
    try {
      await axios
        .post(
          "/friend",
          { friend: data },
          {
            headers: {
              Authorization: localStorage.getItem("login-token"),
            },
          }
        )
        .then(() => {
          alert("친구추가 되었습니다.");
        });
    } catch (error) {
      console.log(error);
      const err = error.response.data;
      if (err.errorCode) {
        switch (err.errorCode) {
          case "ALREADY_FRIEND":
            alert("이미 친구입니다.");
            break;
          case "CLIENT_NOT_EXISTS":
            alert("존재하지 않는 유저입니다.");
            break;
          case "NOT_FRIEND_ME":
            alert("스스로를 친구로 추가할 수 없습니다");
            break;
        }
      }
    }
  };

  const deleteFriend = async (data) => {
    try {
      console.log(data);
      await axios
        .delete("/friend", {
          headers: {
            Authorization: localStorage.getItem("login-token"),
          },
          data: {
            friend: data,
          },
        })
        .then((response) => {
          alert("삭제 되었습니다.");
        });
    } catch (error) {
      console.log(error);
      const err = error.response.data;
      if (err.errorCode) {
        switch (err.errorCode) {
          case "ALREADY_NOT_FRIEND":
            alert("친구가 아닙니다.");
            break;
        }
      }
    }
  };

  useEffect(() => {
    axios
      .get("/friend", {
        headers: {
          Authorization: localStorage.getItem("login-token"),
        },
      })
      .then((response) => {
        const friendData = response.data.friends;
        const list = [];
        friendData.map(async (data, index) => {
          const res = await axios.get(`/client/${data}`);
          const name = res.data.client.name;

          list.push(
            <tr key={index}>
              <td>{name}</td>
              <td>
                <button
                  className="DeleteBtn GmarketM"
                  onClick={() => deleteFriend(data)}
                >
                  x
                </button>
              </td>
            </tr>
          );
        });
        setFriendList(list);
      });
  }, []);

  return (
    <>
      <>
        <Header />
        <div className="BackGround">{feedList}</div>
        <div className="FriendContainer">
          <button className="FriendBtn GmarketS" onClick={openModal}>
            친구추가
          </button>
        </div>
      </>
      <Modal open={modalOpen} close={closeModal} title="친구추가">
        <div className="FriendBack">
          <input
            className="FriendSearch GmarketS"
            type="text"
            id="friendName"
            name="friendName"
            placeholder="이름을 검색하세요"
            onChange={onChangeName}
          ></input>
          <button className="FriendBtn GmarketM" onClick={frinedNameSubmit}>
            검색
          </button>
          <div className="Friend">
            <div className="FriendImage"></div>
            <table className="FriendInfo GmarketS">
              <tbody>{friendList}</tbody>
            </table>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Main;
