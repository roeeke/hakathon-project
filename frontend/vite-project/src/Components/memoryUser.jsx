// UserMemory.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MemoryCard from './Card'; // Component for rendering memory card
import AnswerCard from '../Components/answers'; // Component for rendering answer card

// Fisher Yates Shuffle
function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function shuffleArray(array) {
    const length = array.length;
    for (let i = length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        swap(array, i, randomIndex);
    }
    return array;
}

const UserMemory = () => {
    const [mixedCards, setMixedCards] = useState([]);
    const [clickedCards, setClickedCards] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (clickedCards.length === 2) {
            console.log("clickcards", clickedCards);
            if (clickedCards[0] === clickedCards[1]) {
                setMatchedCards([...matchedCards, clickedCards[0], clickedCards[1]]);
                console.log("matched");
            } else {
                console.log("notmatched");
                setClickedCards([]);
            }
        }
    }, [clickedCards]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/memory-games');
            const { memoryGames } = response.data;
            const allCards = [];
            memoryGames.forEach(memoryGame => {
                memoryGame.questions.forEach(question => {
                    allCards.push({ type: 'question', content: question });
                });
                memoryGame.answers.forEach(answer => {
                    allCards.push({ type: 'answer', content: answer });
                });
            });
            const shuffledCards = shuffleArray(allCards);
            setMixedCards(shuffledCards);
        } catch (error) {
            console.error('Error fetching memory games:', error);
        }
    };


    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    // useEffect(() => {
    //     if()
    // }, [flippedCards])

    return (
        <div>
            <h2>משחק הזיכרון</h2>
            <div className="memory-game-cards-container">
                {mixedCards.map((card, index) => (
                    <React.Fragment key={index}>
                        {card.type === 'question' ? (
                            <MemoryCard
                                question={card.content}
                                matchedCards={matchedCards}
                                setMatchedCards={setMatchedCards}
                                flippedCards={flippedCards}
                                setFlippedCards={setFlippedCards}
                                answer={card.content}
                            />
                        ) : (
                            <AnswerCard
                                setFlippedCards={setFlippedCards}
                                flippedCards={flippedCards}
                                setClickedCards={setClickedCards}
                                clickedCards={clickedCards}
                                question={card.content}  // Pass question here
                                answer={card.content}
                                matchedCards={matchedCards} // Pass matched cards
                                setMatchedCards={setMatchedCards} // Pass setMatchedCards function
                                onCardClick={(questionId, answer) => handleCardClick(questionId, answer)}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default UserMemory;