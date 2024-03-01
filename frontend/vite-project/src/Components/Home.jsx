import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./Home.css"; 

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/users/all-stars"
        ); 
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="home-container">
        <div
          className="card card-1"
          onClick={() => navigate("/daily-question")}
        >
          <h2>החידה המתחלפת</h2>
          <p>תרגיל היום שיבחן את הידע שלך.</p>
        </div>
        <div className="card card-2" onClick={() => navigate("/memory-game")}>
          <h2>משחק זיכרון</h2>
          <p>שפר את כוח הזיכרון שלך.</p>
        </div>
        <div className="card card-3" onClick={() => navigate("/race")}>
          <h2>מבחן נגד הזמן</h2>
          <p>פיצ׳רים עתידיים הישארו מעודכנים</p>
        </div>
      </div>
      <div className="users-list">
        <h3>רשימת כוכבים</h3>
        <ul>
          {users.map((user) => (
            <li key={user.username}>
              {user.username}: ⭐{user.stars}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
