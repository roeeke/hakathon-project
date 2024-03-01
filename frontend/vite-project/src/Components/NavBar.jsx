import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./NavBar.css"; // Ensure this CSS file exists and is correctly styled

const NavBar = ({ isLoggedIn, onLogout, userId }) => {
  const [userDetails, setUserDetails] = useState({ userName: '', userStars: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (isLoggedIn && userId) {
        try {
          const response = await axios.get(`http://localhost:3001/users/details/${userId}`, {
            withCredentials: true,
          });
          const { userName, userStars } = response.data;
          setUserDetails({ userName, userStars });
        } catch (error) {
          console.error('Failed to fetch user details:', error);
          onLogout();
          navigate('/login');
        }
      }
    };

    fetchUserDetails();
  }, [isLoggedIn, navigate, onLogout, userId]);

  const handleLogoutClick = () => {
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {isLoggedIn && (
          <button className="logout-button" onClick={handleLogoutClick}>התנתק</button>
        )}
        <button className="logout-button" onClick={handleHomeClick}>בית</button>
      </div>
      <div className="navbar-right">
        {isLoggedIn && (
          <span className="user-info">
            <span className="stars">⭐{userDetails.userStars}</span> שלום {userDetails.userName}!
          </span>
        )}
        {!isLoggedIn && (
          <Link className="login-link" to="/login">התחבר</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
