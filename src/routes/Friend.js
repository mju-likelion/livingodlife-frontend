import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Friend.scss';

function Friend() {
    return(
        <><button id="openBtn">친구팝업창</button>
            <div className="Modal">
                <div className="Friend">
                    <p>박원호</p>
                    <div className="Profile">
                        <div className="ProfileImage"></div>
                        <div className="ProfileInfo">
                            <p>박원호</p>
                            <p>친구가 된지 3일 째</p>
                        </div>
                    </div>
                </div>
                <button class="closeBtn">X</button>
            </div>
        </>

    );
}

<script>
    window.onload= function(){
    function onClick(){
        document.querySelector('.Friend').style.display='block';
        document.querySelector('.Modal').style.display='block';
    }

    function offClick(){
        document.querySelector('.Friend').style.display='none';
        document.querySelector('.Modal').style.display='none';
    }

    document.getElementById('openBtn').addEventListener('click',onClick);
    document.querySelector('.closeBtn').addEventListener('click',offClick);
};
</script>

export default Friend;