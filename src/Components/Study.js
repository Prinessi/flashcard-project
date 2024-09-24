import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import React, { useEffect, useState } from "react";
import Card from "./Card";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flip, setFlipped] = useState(false);

  useEffect(
    () => {
      const abortController = new AbortController();

      const loadDeck = async () => {
        try {
          const loadedDeck = await readDeck(deckId, abortController.signal);
          await setDeck(loadedDeck);
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("Failed to load deck:", error);
          }
        }
      };

      loadDeck();

      return () => abortController.abort();
    },
    [deckId]
  );

  // useEffect(() => {
  //     console.log(deckId);
  //     console.log(deck.cards);

  // }, [deckId]);

  const handleNextCard = () => {
    if (deck.cards) {
      setCurrentCardIndex(prevIndex => {
        if (prevIndex + 1 < deck.cards.length) {
          return prevIndex + 1;
        } else {
          const confirmRestart = window.confirm(
            "You've reached the last card. Do you want to start over?"
          );
          if (confirmRestart) {
            return 0; // Reset to the first card if the user confirms
          } else {
            return prevIndex; // Stay on the current card if the user declines
          }
        }
      });
      setFlipped(false);
    }
  };

  const handleFlip = () => {
    setFlipped(!flip);
  };

  // If deck is not loaded yet, show a loading message
  if (!deck || !deck.cards) {
    return <h2>Loading deck...</h2>;
  }

  const currentCard = deck.cards[currentCardIndex];

  if (deck.cards.length < 3) {
    return (
      <div>
        <h1>
          Study: {deck.name}
        </h1>
        <h2>Not Enough Cards</h2>
        <p>
          You need at least 3 card to study. There are {deck.cards.length} in
          this deck
        </p>
        <Link to={`/decks/${deck.id}/cards/new`} className="studyButton">+ Add Cards</Link>
      </div>
    );
  } else {
    return (
      <div>
        <h1>
          Study: {deck.name}
        </h1>
        {currentCard &&
          <div>
            <Card
              card={deck.cards[currentCardIndex]}
              count={deck.cards.length}
              currentCardIndex={currentCardIndex}
              handleNextCard={handleNextCard}
              handleFlip={handleFlip}
              flip={flip}
            />
          </div>}
      </div>
    );
  }
}

export default Study;
