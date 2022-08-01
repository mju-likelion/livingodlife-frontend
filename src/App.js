import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from "./Components/Header/Header"
import Test from "./routes/Test/Test"
import Login from "./routes/Login/Login"
import SignUp from "./routes/SignUp/SignUp"
import VerifyEmail from "./routes/VerifyEmail/VerifyEmail"
import Main from './routes/Main/Main';
import Challenge from './routes/Challenge/Challenge';
import ChallengePost from './routes/Challenge/ChallengePost';
import Routine from './routes/Routine/Routine';



const App = () => {
	return (
		<div className='App'>
			<BrowserRouter>
				{/*<Header />*/}
				<Routes>
					
					<Route path="/" element={<Main />}></Route>
					<Route path="/header" element={<Header />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/signup" element={<SignUp />}></Route>
					<Route path="/verifyemail" element={<VerifyEmail />}></Route>
					<Route path="/test" element={<Test />}></Route>
					<Route path="/routine" element={<Routine />}></Route>
					<Route path='/challenge' element={<Challenge />}></Route>
					<Route path='/challenge/challengepost' element={<ChallengePost />} />
					{/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
