import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck, createCard } from "../utils/api";

function CreateCard() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);
    const [formData, setFormData] = useState({
        front: '',
        back: ''
    });

    useEffect(() => {
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
    }, [deckId]);

    if (!deck) {
        return <h2>Loading deck...</h2>;
    }

    const handleChange = ({ target }) => {
        const { id, value } = target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createCard(deckId, formData);
            setFormData({ front: '', back: '' });
        } catch (error) {
            console.error("Failed to create card:", error);
        }
    };

    return (
        <div>
            <h2>{deck.name}: Add Card</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <h5>Front:</h5>
                    <textarea
                        rows="5"
                        cols="80"
                        id="front"
                        placeholder="Front side of card"
                        value={formData.front}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    <h5>Back:</h5>
                    <textarea
                        rows="5"
                        cols="80"
                        id="back"
                        placeholder="Back side of card"
                        value={formData.back}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <Link className="genericButton" to={`/decks/${deck.id}`}>Done</Link>
                <button type="submit" className="studyButton">Submit</button>
            </form>
        </div>
    );
}

export default CreateCard;
