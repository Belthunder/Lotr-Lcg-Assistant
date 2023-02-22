import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//Card imports
import AddCard from "./components/add-card.component";
import Card from "./components/card.component";
import CardsList from "./components/cards-list.component";

//Deck imports
import AddDeck from "./components/add-deck.component";
import Deck from "./components/deck.component";
import DecksList from "./components/decks-list.component";
import DeckStats from "./components/deck-stats.component";

import AddCardToDeck from "./components/add-card-to-deck.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className = "navbar navbar-expand navbar-dark bg-dark">
          <a href="/cards" className="navbar-brand">
            Lotr LCG Assistant
          </a>
          <div className= "navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/cards"} className="nav-link">
                Cards
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Card
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/decks"} className="nav-link">
                Decks
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addDeck"} className="nav-link">
                Add Deck
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addCardToDeck"} className="nav-link">
                Add Card to Deck
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>

            <Route path="/" element={<CardsList/>}/>
            <Route path="/cards" element={<CardsList/>}/>
            <Route path="/add" element={<AddCard/>}/>
            <Route path="/cards/:id" element={<Card/>}/>
            
            <Route path="/decks" element={<DecksList/>}/>
            <Route path="/addDeck" element={<AddDeck/>}/>
            <Route path="/decks/:id" element={<Deck/>}/>
            <Route path="/decks/stats/:id" element={<DeckStats/>}/>

            <Route path="/addCardToDeck" element={<AddCardToDeck/>}/>
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
