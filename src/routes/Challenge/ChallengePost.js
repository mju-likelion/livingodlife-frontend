import React, { Component, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ChallengePost.scss";
import Header from "../../Components/Header/Header";
import imgArrow from "../../image/icon_arrow.png";
import Modal from "../../Components/Modal/Modal";
import imgUpload from "../../image/icon_upload.png";
import axios from "axios";
import async from "async";

function ChallengePost() {
  const [modalOpen, setModalOpen] = useState(false);
  const [files, setFiles] = useState("");
  const [formData, setFormData] = useState({
    imgaeUrl: "",
    certifyingContents: "",
  });
  const [challengeCertifyList, setChallengeCertifyList] = useState([]);
  const [rankData, setRankData] = useState([]);

  const location = useLocation();
  useEffect(() => {
    var challengePath = window.location.pathname;
    var challengeIdPath = challengePath.split("/");

    axios
      .get("/challenge/challengecertifies", {
        headers: {
          Authorization: localStorage.getItem("login-token"),
        },
        params: { challengeId: challengeIdPath[2] },
      })
      .then(async (response) => {
        const certifyData = response.data;
        const list = [];

        console.log(certifyData);
        await async.each(certifyData, async (data) => {
          const { url } = (await axios.get(`/file/${data.imageUrl}`)).data;
          const date = new Date(data.dateCreated);
	        const title = location.state.title;

          list.push(
            <div>
              <h1 className="certTitle GmarketS">{title}</h1>
              <p className="certCont GmarketS">{data.authorName}</p>
              <div className="imgCert">
                <img src={url}></img>
                <p className="certTime GmarketS">{date.toDateString()}</p>
              </div>
              <p className="certCont GmarketS">{data.certifyingContents}</p>
            </div>
          );
        });
        console.log(list);
        setChallengeCertifyList(list);
      });
  }, []);

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
    Preview();

    return () => Preview();
  });

  const Preview = () => {
    if (!files) return false;

    const img = document.querySelector(".fileImage");

    const reader = new FileReader();

    reader.onload = (e) =>
      (img.style.backgroundImage = `url(${reader.result})`);

    reader.readAsDataURL(files[0]);
  };

  const onChangeContent = (e) => {
    //const img = document.querySelector(".fileImage");
    //var imgPath = img.style.backgroundImage;
    //var afterimgPath = imgPath.split('"');

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    console.log(formData);
  };

  const handleClick = async () => {
    //const formdata = new FormData();
    //formdata.append("uploadImage", files[0]);

    /*const config = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };*/
    var path = window.location.pathname;
    var afterStr = path.split("/");

    /**
     * 1. 서버에서 업로드용 주소를 받아오고
     * 2. 업로드용 주소에다가 파일을 업로드하고
     * 3. 서버에서 받아온 키값을 imageUrl 에다가 넣어주면되는데
     */

    try {
      const { url, key } = (await axios.put("/file")).data;
      console.log(url, key);

      await axios.put(url, files[0]);

      await axios.post(
        `/challenge/complete/${afterStr[2]}`,
        {
          imageUrl: key,
          certifyingContents: formData.certifyingContents,
        },
        {
          headers: {
            Authorization: localStorage.getItem("login-token"),
          },
        }
      );
      console.log(formData);

      alert("챌린지가 인증되었습니다.");
    } catch (error) {
      const err = error.response.data;
      if (err.errorCode) {
        switch (err.errorCode) {
          case "ALREADY_ATHENTICATED":
            alert("이미 인증되었습니다.");
            break;
        }
      }
      console.log(err);
    }
  };

    useEffect(() => {
      var challengePath = window.location.pathname;
      var challengeIdPath = challengePath.split("/");
  
      axios
        .get(`/challenge/getchallengerank/${challengeIdPath[2]}`, {
          headers: {
            Authorization: localStorage.getItem("login-token"),
          },
        })
        .then(async (response) => {
          const rankResult = response.data;
          const list = [];
  
          console.log(rankResult);
          rankResult.map((data, index) => {
            list.push(
              <tr className="rankList GmarketS">
                <td>{index+1}</td>
                <td>{data.writerName}</td>
                <td>{data.challengeCount}일</td>
              </tr>
            );
          });
          console.log(list);
          setRankData(list);
        });
    }, []);
  


  return (
    <>
      <Header />
      <div className="wrapPostContent">
        <div className="wrapCert">
          <div className="listCert">{challengeCertifyList}</div>
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
                    {rankData}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Modal open={modalOpen} close={closeModal} title="인증하기">

            <p className="modalCont">여러분의 사진을 업로드 해보세요!</p>
            <div className="wrapCertContent">
              <div className="wrapImage">
                <div className="fileImage"></div>
                <input
                  name="imgaeUrl"
                  type="file"
                  id="imgaeUrl"
                  accept="image/*"
                  onChange={onLoadFile}
                ></input>
              </div>
              <textarea
                type="text"
                id="certifyingContents"
                name="certifyingContents"
                className="inputCont GmarketS"
                rows="3"
                placeholder="본문을 입력해 주세요"
                onChange={onChangeContent}
              ></textarea>
              <button
                className="uploadBtn GmarketS"
                type="submit"
                onClick={handleClick}
              >
                업로드 !
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

export default ChallengePost;
