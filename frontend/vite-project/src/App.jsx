import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import Home from './Components/Home';
import StudentQuestion from './questiongame/studentquestion';
import DailyQuestionAdmin from './questiongame/adminquestion';
import MemoryAdmin from './Components/memoryAdmin'; 
import UserMemory from './Components/memoryUser'; 
import axios from 'axios';
import { getCookie, clearCookie, setCookie } from './cookieHelper';

axios.defaults.withCredentials = true;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(getCookie('userId') || null);
  const [isAdmin, setIsAdmin] = useState(getCookie('admin') === 'true');
  const navigate = useNavigate();

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
      clearCookie('admin');
      setIsLoggedIn(false);
      setIsAdmin(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      setCookie('userId', userId);
    }
  }, [userId]);

  useEffect(() => {
   if(isAdmin){
      setCookie('admin', isAdmin)}
  }, [isAdmin]);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} userId={userId} />
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} setIsAdmin={setIsAdmin} />} />
        <Route path="/daily-question" element={isAdmin ? <DailyQuestionAdmin /> : <StudentQuestion isLoggedIn={isLoggedIn} userId={userId} />} />
        <Route path="/memory-game" element={isAdmin ? <MemoryAdmin /> : <UserMemory />} /> 
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
