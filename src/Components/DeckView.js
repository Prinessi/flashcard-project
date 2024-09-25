import { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CardView from "./CardView";
import { deleteCard } from "../utils/api";
import { deleteDeck } from "../utils/api";
import breadcrumbBar from "./BreadcrumbBar";

function DeckView() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cardDeleted, setCardDeleted] = useState(0);

  const navigate = useNavigate();

  useEffect(
    () => {
      const abortController = new AbortController();

      const loadDeck = async () => {
        try {
          const loadedDeck = await readDeck(deckId, abortController.signal);
          setDeck(loadedDeck);
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("Failed to load deck:", error);
          }
        }
      };

      loadDeck();

      return () => abortController.abort();
    },
    [cardDeleted]
  );

  if (!deck || !deck.cards ) {
    return <h2>Loading deck...</h2>;
  }

  const handleDeleteCard = async (card) => {
    const confirmDelete = window.confirm(
        "Delete this card? You will not be able to recover it."
      );
      if (confirmDelete) {
        await deleteCard(card.id);
        await setCardDeleted(cardDeleted + 1)
      } else {
       // Do nothing
      }
  }

  const handleDelete = (deck) => {
    const confirmDelete = window.confirm(
        "Delete this deck? You will not be able to recover it."
      );
      if (confirmDelete) {
        deleteDeck(deckId);
        navigate(`/`); 
      } else {
       // Do nothing
      }
  }

  const breadcrumbData = [
    { name: 'Home', url: '/' },
    { name: deck.name, url: `/decks/${deck.id}` }
  ];

  return (
    <div>
      {breadcrumbBar(breadcrumbData)}
      <div className="deckView">
        <h1>
          {deck.name}
        </h1>
        <p>
          {deck.description}
        </p>
        <Link className="genericButton" to={`/decks/${deck.id}/edit`}>
          Edit
        </Link>
        <Link className="studyButton" to={`/decks/${deck.id}/study`}>
          study
        </Link>
        <Link className="studyButton" to={`/decks/${deck.id}/cards/new`}>+ Add Cards</Link>
        <button className="deleteButton" onClick={handleDelete}>delete</button>
      </div>
      <h2 style={{marginBottom: "-2rem"}}>Cards</h2>
      {deck.cards &&
        <ul className="cardView">
          {deck.cards.map(card =>
            <CardView card={card} handleDeleteCard={handleDeleteCard} deckid={deck.id}/>
          )}
        </ul>}
    </div>
  );
}

export default DeckView;
  