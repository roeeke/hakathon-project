import React, { useState, useEffect } from 'react';
import './Card.css';

const MemoryCard = ({ question, setFlippedCards, flippedCards, matchedCards, setMatchedCards, answer }) => {


    const handleCardClick = () => {
        console.log(answer)
        console.log(question)
        if (flippedCards.includes(question.questionId)) {
            console.log("its a match")
            setMatchedCards([...matchedCards, ...flippedCards, question._id])
        } else {
            console.log("not a match")
        }
        if (flippedCards.length > 1) {
            setFlippedCards([])
        } else {
            setFlippedCards([...flippedCards, question._id])
        }
    }
    return (
        <div className={`memory-card`} onClick={handleCardClick}>
            <div className="card-content">
                {matchedCards.includes(question._id) || flippedCards.includes(question._id) ? (
                    <h3 className="card-title">{question.questionText}</h3>
                ) : (
                    <h3 className="card-title"></h3>
                )}
            </div>
        </div>
    );
};

export default MemoryCard;