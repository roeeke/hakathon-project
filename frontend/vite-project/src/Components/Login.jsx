import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../cookieHelper'; // Import the setCookie function
import './Login.css'
axios.defaults.withCredentials = true;

const Login = ({ setIsLoggedIn, isLoggedIn,setUserId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const nav = useNavigate();

  const handleLoginRegister = async () => {
    try {
      if (isLogin) {
        const response = await axios.post('/auth/login', { email, password });
        if (response.status === 200) {
          setIsLoggedIn(true);
          setCookie('authToken', response.data.token);
          const userId = response.data.userid;
          setUserId(userId)
          setCookie('userId', userId);
          console.log(userId);
          console.log('Login successful');
          nav('/');
        }
      } else {
        const response = await axios.post('/auth/register', { username, email, password });
        if (response.status === 201) {
          console.log('Registration successful');
          setIsLogin(true);
          setMessage('Registration successful. Please log in.');
        }
      }
    } catch (error) {
      console.error('Login/Register error:', error);
      setMessage('Login/Register failed. Please try again.');
    }
  };

  return (
    <div className="login-box">
      <h2>{isLogin ? 'התחבר' : 'הירשם'}</h2>
      {!isLogin && <div className="user-box"><label>שם משתמש:</label><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required /></div>}
      <div className="user-box"><label>אימייל:</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
      <div className="user-box"><label>סיסמא:</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
      <button onClick={handleLoginRegister}>{isLogin ? 'התחבר' : 'הירשם'}</button>
      <p>{message}</p>
      <p>{isLogin ? "עדיין אין לך משתמש?" : "כבר יש לך משתמש?"}
        <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'הירשם' : 'התחבר'}</span>
      </p>

    </div>
  );
};

export default Login;
