function Card({card, count, currentCardIndex, handleNextCard, handleFlip, flip}) {
    if (flip == true){
        return (
            <div className="card">
                <h3>Card: {currentCardIndex + 1} of {count} </h3>
                <p>{card.back}</p>
                <button className="genericButton" onClick={handleFlip}>Flip</button>
                <button className="studyButton" onClick={handleNextCard}>Next</button>
            </div>
        )
    } else {
        return(
            <div className="card">
                <h3>Card {currentCardIndex + 1} of {count} </h3>
                <p>{card.front}</p>
                <button className="genericButton" onClick={handleFlip}>Flip</button>
            </div>
        )
    }
    
}

export default Card;