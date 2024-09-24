import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { createDeck } from "../utils/api";

function CreateDeck() {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const navigate = useNavigate();

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newDeck = await createDeck(formData); 
            navigate(`/decks/${newDeck.id}`); 
        } catch (error) {
            console.error("Failed to create deck:", error);
        }
    };

    return (
        <div className="createDeck">
            <h2>Create Deck</h2>
            <form className="createForm" onSubmit={handleSubmit}>
                <label>
                    <p>Name</p>
                    <textarea
                        rows="1"
                        type="text"
                        cols="80"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Deck Name"
                    />
                </label>
                <br />
                <label>
                    <p>Description</p>
                    <textarea
                        rows="5"
                        cols="80"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Brief description of the deck"
                    />
                </label>
                <br />
                <Link className="genericButton" to={`/`}>Cancel</Link>
                <button className="studyButton" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateDeck;
