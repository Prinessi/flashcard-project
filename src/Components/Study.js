import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import breadcrumbBar from "./BreadcrumbBar";

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
            return 0; 
          } else {
            return prevIndex; 
          }
        }
      });
      setFlipped(false);
    }
  };

  const handleFlip = () => {
    setFlipped(!flip);
  };

  if (!deck || !deck.cards) {
    return <h2>Loading deck...</h2>;
  }

  const currentCard = deck.cards[currentCardIndex];

  const breadcrumbData = [
    { name: 'Home', url: '/' },
    { name: deck.name, url: `/decks/${deck.id}` },
    { name: 'Study', url: `/decks/${deck.id}/study`}
  ];

  if (deck.cards.length < 3) {
    return (
      <div>
        {breadcrumbBar(breadcrumbData)}
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
        {breadcrumbBar(breadcrumbData)}
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
