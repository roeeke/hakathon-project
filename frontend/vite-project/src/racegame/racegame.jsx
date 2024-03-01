// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Race() {
//   const [gameId, setGameId] = useState(null);
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState('');
//   const [currentQuestion, setCurrentQuestion] = useState(null);

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:3000/racing-games/subjects');
//         setSubjects(data.subjects);
//       } catch (error) {
//         console.error('Failed to fetch subjects:', error);
//       }
//     };
  
//     fetchSubjects();
//   }, []);
  
  
//   const startGame = async () => {
//     try {
//       // Adjust the body to include the subject when starting a game
//       const { data } = await axios.post('http://localhost:3000/racing-games/start', { // Ensure this endpoint matches your backend
//         subject: selectedSubject,
//       });
//       setGameId(data.gameId); // Adjust according to the actual response structure
//       fetchQuestion(data.gameId);
//     } catch (error) {
//       console.error('Failed to start game:', error);
//     }
//   };
  

//   const fetchQuestion = async (gameId) => {
//     try {
//       const { data } = await axios.get(`http://localhost:3000/racegame/${gameId}/current-question`);
//       setCurrentQuestion(data);
//     } catch (error) {
//       console.error('Failed to fetch question:', error);
//     }
//   };

//   const submitAnswer = async () => {
//     try {
//       const { data } = await axios.post('http://localhost:3000/racegame/submit-answer', {
//         gameId,
//         answerIndex: currentQuestion.options.findIndex(option => option.isCorrect),
//       });
//       if (data.finished) {
//         alert('Game finished!');
//       } else {
//         fetchQuestion(gameId); 
//       }
//     } catch (error) {
//       console.error('Failed to submit answer:', error);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Race Game</h1>
//       {!gameId && (
//         <>
//           <h2>Select a subject:</h2>
//           <select onChange={(e) => setSelectedSubject(e.target.value)} value={selectedSubject}>
//             <option value="">Select a subject</option>
//             {subjects.map(subject => (
//               <option key={subject} value={subject}>{subject}</option>
//             ))}
//           </select>
//           <button onClick={startGame} disabled={!selectedSubject}>Start Game</button>
//         </>
//       )}
//       {currentQuestion && (
//         <div>
//           <h2>{currentQuestion.questionText}</h2>
//           {currentQuestion.options.map((option, index) => (
//             <button key={index} onClick={() => submitAnswer(index)}>
//               {option.text}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Race;
