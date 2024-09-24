import { Link } from "react-router-dom"
import { deleteDeck } from "../utils/api";

function Deck({deck, handleDelete}) {
    

    return(
        <div className="deck">
            <h1>{deck.name}</h1>
            <p>{deck.description}</p>
            <p>{deck.cards.length} cards</p>
            <Link className="genericButton" to={`/decks/${deck.id}`}>View</Link>
            <Link className="studyButton" to={`/decks/${deck.id}/study`}>study</Link>
            <button className="deleteButton" onClick={()=>handleDelete(deck)}>delete</button>
        </div>
    )
}

export default Deck