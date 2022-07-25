import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from "./Components/Header"
import Test from "./Components/Test"
import Login from "./Components/Login"
import SignUp from "./Components/SignUp"
import VerifyEmail from "./Components/VerifyEmail"
import Main from './Components/Main';
import Challenge from './Components/Challenge';
import Routine from './Components/Routine';


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
					<Route path="/challenge" element={<Challenge />}></Route>
					<Route path="/routine" element={<Routine />}></Route>

					{/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
