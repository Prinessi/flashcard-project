import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { createDeck } from "../utils/api";
import breadcrumbBar from "./BreadcrumbBar";

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

    const breadcrumbData = [
        { name: 'Home', url: '/' },
        { name: 'Create Deck', url: '/decks/new' },
      ];

    return (
        <div className="createDeck">
            {breadcrumbBar(breadcrumbData)}
            <h2>Create Deck</h2>
            <form className="createForm" onSubmit={handleSubmit}>
                <label>
                    <p>Name</p>
                    <input
                        type="text"
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
