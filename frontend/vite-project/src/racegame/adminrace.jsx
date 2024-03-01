// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminRace = () => {
//     const [questionSubject, setQuestionSubject ]= useState('');
//   const [questionContent, setQuestionContent] = useState('');
//   const [options, setOptions] = useState(['', '', '', '']);
//   const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = 'http://localhost:3001/racing-games/create';
//     try {
//       await axios.post(url, {
//         subject: questionSubject,
//         content: questionContent,
//         options: options.map((option, index) => ({
//           text: option,
//           isCorrect: index === correctAnswerIndex,
//         })),
//       });
//       alert(`Daily question created successfully`);
//     } catch (error) {
//       console.error(`Error creating daily question:`, error);
//       alert(`Failed to create the daily question`);
//     }
//   };
  

//   const handleOptionChange = (index, event) => {
//     const newOptions = [...options];
//     newOptions[index] = event.target.value;
//     setOptions(newOptions);
//   };

//   // Simple inline styles
//   const formStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     maxWidth: '500px',
//     margin: 'auto',
//     padding: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '8px',
//   };

//   const inputStyle = {
//     marginBottom: '10px',
//     padding: '8px',
//     border: '1px solid #ddd',
//     borderRadius: '4px',
//   };

//   const buttonStyle = {
//     padding: '10px 20px',
//     background: '#007bff',
//     color: '#ffffff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   };

//   return (
//     <form onSubmit={handleSubmit} style={formStyle}>
//         <div>
//         <label htmlFor="questionContent">נושא</label>
//         <br />
//         <textarea
//           id="questionContent"
//           value={questionSubject}
//           onChange={(e) => setQuestionSubject(e.target.value)}
//           required
//           style={{ ...inputStyle, height: '100px', resize: 'vertical' }}
//         />
//       </div>
//       <div>
//         <label htmlFor="questionContent">צור שאלה:</label>
//         <br />
//         <textarea
//           id="questionContent"
//           value={questionContent}
//           onChange={(e) => setQuestionContent(e.target.value)}
//           required
//           style={{ ...inputStyle, height: '100px', resize: 'vertical' }}
//         />
//       </div>
//       <div>
//         <label>תשובות:</label>
//         {options.map((option, index) => (
//           <div key={index}>
//             <input
//               type="radio"
//               name="correctAnswer"
//               value={index}
//               checked={correctAnswerIndex === index}
//               onChange={() => setCorrectAnswerIndex(index)}
//               style={{ marginRight: '10px' }}
//             />
//             <input
//               type="text"
//               value={option}
//               onChange={(e) => handleOptionChange(index, e)}
//               required
//               style={inputStyle}
//             />
//           </div>
//         ))}
//       </div>
//       <button type="submit" style={buttonStyle}>{'צור שאלה'}</button>
//     </form>
//   );
// };

// export default AdminRace;
