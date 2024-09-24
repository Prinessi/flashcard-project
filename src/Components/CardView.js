import { Link } from "react-router-dom";

function CardView({ card, handleDeleteCard, deckid }) {
  return (
    <div className="card">
      <p>
        {card.front}
      </p>
      <p>
        {card.back}
      </p>
      <Link className="genericButton" to={`/decks/${deckid}/cards/${card.id}/edit`}>Edit</Link>
      <button className="deleteButton" onClick={() => handleDeleteCard(card)}>Delete</button>
    </div>
  );
}

export default CardView;
