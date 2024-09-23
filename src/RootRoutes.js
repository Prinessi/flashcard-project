import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./Layout/NotFound";
import Home from "./Components/Home";

function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/decks/new" element={<NotFound />} />
      <Route path="/decks/:deckId" element={<NotFound />}>
        <Route path="study" element={<NotFound />} />
        <Route path="edit" element={<NotFound />} />
        <Route path="cards/new" element={<NotFound />} />
        <Route path="cards/:cardId/edit" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RootRoutes;
