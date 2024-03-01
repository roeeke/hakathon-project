import React, { useState, useEffect } from 'react';
import './Card.css';

const AnswerCard = ({ question, answer, matchedCards, setMatchedCards, clickedCards, setClickedCards, setFlippedCards, flippedCards }) => {
    // const [isFlipped, setIsFlipped] = useState(false);

    // useEffect(() => {
    //     // Reset flipped state when a new card is rendered or when a match is found
    //     setIsFlipped(false);
    // }, [answer, matchedCards]);

    // const handleCardClick = () => {
    //     // Prevent flipping if the card is already matched or already flipped
    //     if (matchedCards.includes(answer.questionId) || isFlipped) return;

    //     // Add clicked card to the clickedCards state
    //     setClickedCards([...clickedCards, answer.questionId]);

    //     // Check if two cards have been clicked
    //     if (clickedCards.length === 1) {
    //         checkForMatch(answer.questionId);
    //     }

    //     // Flip the card
    //     setIsFlipped(true);
    // };

    // const checkForMatch = (questionId) => {
    //     const firstClickedId = clickedCards[0];

    //     // Check if the clicked card matches the previously clicked card
    //     if (firstClickedId === questionId) {
    //         console.log("You got a match");
    //         // Add both cards to the matchedCards state
    //         setMatchedCards([...matchedCards, firstClickedId]);
    //     } else {
    //         console.log("Not matched!");
    //         // Reset clicked cards after a delay
    //         setTimeout(() => {
    //             setClickedCards([]);
    //         }, 500);
    //     }
    // };
    const handleCardClick = () => {
        console.log(answer)
        console.log(question)
        if (flippedCards.includes(answer.questionId)) {
            console.log("its a match")
            setMatchedCards([...matchedCards, ...flippedCards, answer._id])
        } else {
            console.log("not a match")
        }
        if (flippedCards.length > 1) {
            setFlippedCards([])
        } else {
            setFlippedCards([...flippedCards, answer._id])
        }
    }

    console.log(matchedCards)
    return (
        <div className={`memory-card`} onClick={handleCardClick}>
            <div className="card-content">
                {matchedCards.includes(question._id) || flippedCards.includes(question._id) ? (
                    <h3 className="card-title">{answer.answerText}</h3>
                ) : (
                    <h3 className="card-title"></h3>
                )}
            </div>
        </div>
    );
};

export default AnswerCard;