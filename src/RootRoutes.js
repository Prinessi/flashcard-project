import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./Layout/NotFound";
import Home from "./Components/Home";
import Study from "./Components/Study";
import CreateCard from "./Components/CreateCard";
import DeckView from "./Components/DeckView";
import CreateDeck from "./Components/CreateDeck";
import EditCard from "./Components/EditCard";
import EditDeck from "./Components/EditDeck";

function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/decks/new" element={<CreateDeck />} />
      <Route path="/decks/:deckId/" element={<DeckView />} />
      <Route path="/decks/:deckId/study" element={<Study />} />
      <Route path="/decks/:deckId/edit" element={<EditDeck />} />
      <Route path="/decks/:deckId/cards/new" element={<CreateCard />} />
      <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RootRoutes;
