// App.js
import React, { useState,useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import Home from './Components/Home';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getCookie, clearCookie, setCookie } from './cookieHelper'
axios.defaults.withCredentials = true;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId,setUserId]=useState(getCookie('userId') || null)
const Navigate=useNavigate()
useEffect(() => {
 
  const authToken = getCookie('authToken');
  if (authToken) {
    setIsLoggedIn(true);
  }
}, []);
const handleLogout = async () => {
  try {
    await axios.post('/auth/logout');
    clearCookie('authToken');
    clearCookie('userId');
    setIsLoggedIn(false);
    Navigate('/');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
useEffect(() => {
  if (userId) {
    setCookie('userId', userId);
  }
}, [userId]);
  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setUserId={setUserId} />} />
        {/* <Route path="/register" element={<Register setToken={setToken} />} /> */}
        <Route path="/" element={<Home isLoggedIn={isLoggedIn}  userId={userId} />} />
      </Routes>
    </>
  );
}

export default App;
