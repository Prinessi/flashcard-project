import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck, readCard, updateCard } from "../utils/api"; // Assuming updateCard exists in your api file
import breadcrumbBar from "./BreadcrumbBar";

function EditCard() {
    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState(null);
    const [formData, setFormData] = useState({
        front: '',
        back: ''
    });
    const navigate = useNavigate(); // To redirect after form submission

    // Load the deck and card when the component mounts
    useEffect(() => {
        const abortController = new AbortController();

        const loadDeckAndCard = async () => {
            try {
                const loadedDeck = await readDeck(deckId, abortController.signal);
                setDeck(loadedDeck);
                const loadedCard = await readCard(cardId, abortController.signal);
                setFormData({
                    front: loadedCard.front,
                    back: loadedCard.back,
                });
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Failed to load deck or card:", error);
                }
            }
        };

        loadDeckAndCard();

        return () => abortController.abort();
    }, [deckId, cardId]);

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
            const updatedCard = {
                id: Number(cardId), 
                ...formData,
                deckId: Number(deckId), 
            };
            await updateCard(updatedCard); 
            navigate(`/decks/${deckId}`); 
        } catch (error) {
            console.error("Failed to update card:", error);
        }
    };

    const breadcrumbData = [
        { name: 'Home', url: '/' },
        { name: deck.name, url: `/decks/${deck.id}` },
        { name: `Edit Card`, url: `/decks/${deck.id}/cards/${cardId}/edit` }
      ];

    return (
        <div>
            {breadcrumbBar(breadcrumbData)}
            <h2>{deck.name}: Edit Card</h2>
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
                <Link className="genericButton" to={`/decks/${deckId}`}>Cancel</Link>
                <button type="submit" className="studyButton">Submit</button>
            </form>
        </div>
    );
}

export default EditCard;
