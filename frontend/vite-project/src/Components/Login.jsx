import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../cookieHelper'; // Import the setCookie function
import './Login.css'
axios.defaults.withCredentials = true;

const Login = ({ setIsLoggedIn, isLoggedIn, setUserId, setIsAdmin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('')
  const nav = useNavigate();

  const handleLoginRegister = async () => {
    try {
      if (isLogin) {

        const response = await axios.post('/auth/login', { email, password });
        if (response.status === 200) {
          setIsLoggedIn(true);
          setCookie('authToken', response.data.token);
          const userId = response.data.userid;
          const admin=response.data.isAdmin;
          setUserId(userId)
          setCookie('userId', userId);
          console.log(userId);
          console.log('Login successful');
          if (email === 'ofek@gmail.com' && password === '123456') {
              setIsAdmin(true);
              setCookie('admin',admin)
            }
          nav('/');
        }
      } else {
        console.log(username);
        const response = await axios.post('/auth/register', { username, email, password });
        if (response.status === 201) {
          console.log('Registration successful');
          setIsLogin(true);
          setMessage('ההרשמה בוצעה בהצלחה, התחבר.');
        }
      }
    } catch (error) {
      console.error('Login/Register error:', error);
      setMessage('ההתחברות או ההרשמה נכשלה. אנה נסה שנית');
    }
  };

  return (
    <div className="form_main">
      <div className="heading">{isLogin ? 'התחבר' : 'הירשם'}</div>
      {!isLogin && <div className="inputContainer"><label>שם משתמש:</label><input type="text" className="inputField" value={username} onChange={(e) => setUsername(e.target.value)} required /></div>}
      <div className="inputContainer"><label>אימייל:</label><input type="email" className="inputField" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
      <div className="inputContainer"><label>סיסמה:</label><input type="password" className="inputField" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
      <button id="button" onClick={handleLoginRegister}>{isLogin ? 'התחבר' : 'הירשם'}</button>
      <p className="message">{message}</p>
      <p className="forgotLink">{isLogin ? "עדיין אין לך משתמש?" : "כבר יש לך משתמש?"}<span id='loginsignup' onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'הירשם' : 'התחבר'}</span></p>
    </div>
  );
};

export default Login;