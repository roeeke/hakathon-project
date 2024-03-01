 import React, { useState } from 'react';
import axios from 'axios';
import '../Components/memoryAdmin.css'; // Import the CSS file

const MemoryAdmin = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const handleCreateMemoryGame = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/memory-games', {
        questions,
        answers
      });
      console.log('Memory game created successfully:', response.data.memoryGame);
      // Clear input fields after successful creation
      setTitle('');
      setQuestions([]);
      setAnswers([]);
    } catch (error) {
      console.error('Error creating memory game:', error);
    }
  };

  return (
    <div className="memory-admin-container">
      <div className="memory-admin-content">
        <h2 className="memory-admin-title">צור כרטיסיה למשחק</h2>
        <input
          type="text"
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
          placeholder="שאלה"
          className="memory-admin-input"
        />
        <input
          type="text"
          value={answers}
          onChange={(e) => setAnswers(e.target.value)}
          placeholder="תשובה"
          className="memory-admin-input"
        />
        <button
          onClick={handleCreateMemoryGame}
          className="memory-admin-button"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default MemoryAdmin;