import { useEffect, useState } from "react";
import { listDecks } from "../utils/api";
import Deck from "./Deck";
import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function Home() {
    const [decks, setDecks] = useState([]);
    const [deckUpdated, setDeckUpdated] = useState(0)
    

    useEffect(() => {
        const abortController = new AbortController();
        
        const loadDecks = async () => {
            try {
                const loadedDecks = await listDecks(abortController.signal);
                setDecks(loadedDecks);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Failed to load decks:", error);
                }
            }
        };

        loadDecks();
        console.log(decks  )
        return () => abortController.abort();
    }, [deckUpdated]);

    const handleDelete = (deck) => {
        const confirmDelete = window.confirm(
            "Delete this deck? You will not be able to recover it."
          );
          if (confirmDelete) {
            deleteDeck(deck.id);
            setDeckUpdated(deckUpdated + 1)
          } else {
           // Do nothing
          }
    }

    const list = decks.map((deck) => <Deck key={deck.id} deck={deck} handleDelete={handleDelete}/>);

    return(
        <div>
            <Link className="genericButton" to={`/decks/new`}>+ Create Deck</Link>
            {list}
        </div>
    )
}

export default Home;