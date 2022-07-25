import './Test.scss';
import imgArrow from '../image/icon_arrow.png';
import { useState, useRef } from 'react';
import { qnaList, resultList, challengeList } from '../atoms/data.js';

//챌린지 카테고리 5개
//0 : 수면
//1 : 운동
//2 : 지식
//3 : 계획
//4 : 정리

const Test = () => {

    const startRef = useRef();
    const qnaRef = useRef();
    const resultRef = useRef();
    const question = useRef();
    const answer = useRef();
    const count = useRef();
    
    var type = [0,0,0,0,0];
    var sum = 0;

    function start() {
        setTimeout(() => {
            startRef.current.style.display = 'none';
            qnaRef.current.style.display = 'block';
        }, 400);

        var qNum = 0;
        goQna(qNum);
    }

    function restart(){
        window.location.reload();
    }


    function setResult(point) {

        const resultName = document.querySelector('.resultName');
        resultName.innerText = resultList[point].name;
        const resultNameIntro = document.querySelector('.resultNameIntro');
        resultNameIntro.innerText = resultList[point].nameIntro;
        const resultCont1 = document.querySelector('.resultCont1');
        const resultCont2 = document.querySelector('.resultCont2');
        const resultCont3 = document.querySelector('.resultCont3');
        const resultCont4 = document.querySelector('.resultCont4');
        resultCont1.innerText = resultList[point].cont1;
        resultCont2.innerText = resultList[point].cont2;
        resultCont3.innerText = resultList[point].cont3;
        resultCont4.innerText = resultList[point].cont4;


    }

    function setChallenge(point){
        const challenge = document.querySelector('.challenge');
        var challengeName = document.createElement('div');

        challengeName.classList.add('challengeName');
        challenge.appendChild(challengeName);
        challengeName.innerText = challengeList[point].name;

        var challengeBtn = document.createElement('button');
        challengeBtn.classList.add('challengeBtn');
        challengeBtn.classList.add('GmarketM');
        
        challengeName.appendChild(challengeBtn);
        challengeBtn.innerText = "도전";
    }

    function goResult(sum,type) {

        setTimeout(() => {
            qnaRef.current.style.display = 'none';
            resultRef.current.style.display = 'block';
        }, 450);

        //let qIdx = 0;
        //goQna(qIdx);

        var max = type.indexOf(Math.max(...type));
        console.log(max);

        if (sum < 60) {
            setResult(0);
            setChallenge(max);
        }
        else if (sum >= 60 && sum < 70) {
            setResult(1);
            setChallenge(max);
            type[max]=0;
            var second = type.indexOf(Math.max(...type));
            setChallenge(second);
        }
        else if (sum >= 70 && sum < 80) {
            setResult(2);
            setChallenge(max);
            type[max]=0;

            second = type.indexOf(Math.max(...type));
            setChallenge(second);
            type[second]=0;

            var third = type.indexOf(Math.max(...type));
            setChallenge(third);
        }
        else {
            setResult(3);
        }
    }


    function goQna(qNum, sum, type) {
        if (qNum == 20) { //질문 추가하고 20로 수정할 예정
            goResult(sum, type);
            return;
        }

        console.log(question.current.innerText);
        question.current.innerText = qnaList[qNum].q;

        count.current.innerText = (qNum+1) + "/" +20;

        for (let i = 0; i < 5; i++) {
            addAnswer(qNum, qnaList[qNum].a[i].answer, i);
        }

    }


    function addAnswer(qNum, aText, index) {
        var a = document.createElement('button');
        a.classList.add('answerList');
        answer.current.appendChild(a);
        a.innerText = aText;

        a.addEventListener("click", function () {
            var children = document.querySelectorAll('.answerList');
            for (let i = 0; i < children.length; i++) {
                children[i].disabled = true;
            }
            setTimeout(() => {

                for (let i = 0; i < children.length; i++) {
                    children[i].style.display = 'none';
                }
                sum += qnaList[qNum].a[index].count;
                console.log(qnaList[qNum].a[index].count);
                console.log(sum);
                var target = qnaList[qNum].a[index].type;
                if(qnaList[qNum].a[index].count==1){
                    for(let i=0;i<target.length;i++){
                    type[target[i]]+=2;
                    }
                }
                else if(qnaList[qNum].a[index].count==2){
                    for(let i=0;i<target.length;i++){
                        type[target[i]]+=1;
                        }
                }

                goQna(++qNum, sum, type);
            }, 450)
        }, false)


    }




    return (
        <>
            <div id='startPage' ref={startRef}>
                <h1 className='jalan testTitle'>'GOD생' 살기</h1>
                <p className='GmarketM' id='testContent'>당신의 ‘GOD생’을 테스트 해보세요!</p>
                <button className='GmarketS' id='startBtn' onClick={start}>테스트 시작
                    <div id='circle'><img src={imgArrow} id='imgArrow'></img></div>
                </button>
            </div>
            <div id='qnaPage' ref={qnaRef}>
                <h2 id='sidePage' className='jalan'>TEST PAGE</h2>
                <button className='sideBtn GmarketS' onClick={restart}>돌아가기</button>
                <div className='count GmarketS' ref={count}>1/25</div>
                <div className='question GmarketM' ref={question}></div>
                <div className='answer GmarketS' ref={answer}></div>
            </div>
            <div id='resultPage' ref={resultRef}>
            <h2 id='sidePage' className='jalan'>RESULT</h2>
                <button className='sideBtn GmarketS' onClick={restart}>돌아가기</button>
                <h1 className='GmarketS resultTitle'>나의 'GOD생' 유형은?</h1>
                <div className="resultName jalan">
                </div>
                <div className="resultNameIntro GmarketM">
                </div>
                <div className='resultCont1 GmarketS'>
                </div>
                <h2 className='GmarketS subTitle'>나의 특징은?</h2>
                <div className='resultCont2 GmarketS'>
                </div>
                <h2 className='GmarketS subTitle'>나의 단점은?</h2>
                <div className='resultCont3 GmarketS'></div>
                <h2 className='GmarketS subTitle'>추천 챌린지</h2>
                <div className='resultCont4 GmarketS'></div>
                <div className='challenge GmarketM'></div>
               
            </div>
        </>
    );
}


export default Test;