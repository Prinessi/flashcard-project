import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck, updateDeck } from "../utils/api";
import breadcrumbBar from "./BreadcrumbBar";

function EditDeck() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({
        id: Number(deckId),
        name: '',
        description: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const abortController = new AbortController();

        const loadDeck = async () => {
            try {
                const loadedDeck = await readDeck(deckId, abortController.signal);
                setDeck({
                    name: loadedDeck.name,
                    description: loadedDeck.description,
                });
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Failed to load deck:", error);
                }
            }
        };

        loadDeck();

        return () => abortController.abort();
    }, [deckId]);

    if (!deck) {
        return <h2>Loading deck...</h2>;
    }

    const handleChange = ({ target }) => {
        const { id, value } = target;
        setDeck({
            ...deck,
            [id]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedDeck = {
                id: Number(deckId), 
                ...deck
            };
            await updateDeck(updatedDeck);
            navigate(`/decks/${deckId}`);
        } catch (error) {
            console.error("Failed to update deck:", error);
        }
    };

    const breadcrumbData = [
        { name: 'Home', url: '/' },
        { name: deck.name, url: `/decks/${deckId}` },
        { name: `Edit Deck`, url: `/decks/${deckId}/edit` }
      ];

    return (
        <div>
            {breadcrumbBar(breadcrumbData)}
            <h2>Edit Deck</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <h5>Name</h5>
                    <textarea
                        rows="1"
                        cols="80"
                        id="name"
                        value={deck.name}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    <h5>Description</h5>
                    <textarea
                        rows="5"
                        cols="80"
                        id="description"
                        value={deck.description}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <Link className="genericButton" to={`/decks/${deckId}`}>Cancel</Link>
                <button type="submit" className="studyButton">Submit</button>
            </form>
        </div>
    );
}

export default EditDeck;
