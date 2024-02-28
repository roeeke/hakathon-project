import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = ({ isLoggedIn, userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/auth/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className='header' style={{ display: 'flex', justifyContent: 'center' }}>
      <h1>היי {user ? user.username : ''}! ברוכים הבאים לבית ספר פסגות</h1>
    </div>
  );
};

export default Home;
