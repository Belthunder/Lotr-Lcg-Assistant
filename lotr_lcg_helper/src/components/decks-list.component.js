import React, { Component } from "react"
import DeckDataService from "../services/deck.service"
import { Link } from "react-router-dom"

export default class DecksList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveDecks = this.retrieveDecks.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveDeck = this.setActiveDeck.bind(this);
        this.removeAllDecks = this.removeAllDecks.bind(this);
        this.searchName = this.searchName.bind(this);

        this.state = {
            decks: [],
            currentDeck: null,
            currentIndex: -1,
            searchName: ""
        };
    }

    componentDidMount() {
        this.retrieveDecks();
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

    retrieveDecks() {
        DeckDataService.getAll().then(response => {
            this.setState({
                decks: response.data
            });
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    refreshList() {
        this.retrieveDecks();
        this.setState({
            currentDeck: null,
            currentIndex: -1
        });
    }

    setActiveDeck(deck, index) {
        this.setState({
            currentDeck: deck,
            currentIndex: index
        });
    }

    removeAllDecks() {
        DeckDataService.deleteAll().then(response => {
            this.setState({
                decks: response.data
            });
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    searchName() {
        this.setState({
            currentDeck: null,
            currentIndex: -1
        });

        DeckDataService.findByName(this.state.searchName).then(response => {
            this.setState({
                decks: response.data
            });
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        });
    }


    render() {
        const { searchName, decks, currentDeck, currentIndex } = this.state;

        return(
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="search by deck name"
                            value={searchName}
                            onChange={this.onChangeSearchName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchName}
                                >
                                    Search
                                </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Decks List</h4>
                    <ul className="list-group">
                        {decks && decks.map((deck, index) => (
                            <li
                                className={"list-group-item" + (index === currentIndex ? "active" : "")}
                                onClick={()=> this.setActiveDeck(deck, index)}
                                key={index}
                                >
                                    {deck.deck_name}
                                </li>
                        ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllDecks}
                        >
                            Remove All Decks
                        </button>
                </div>
                <div className="col-md-6">
                    {currentDeck ? (
                        <div>
                            <h4>Deck</h4>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentDeck.deck_name}
                            </div>
                            <div>
                                <label>
                                    <strong>Deck Creator:</strong>
                                </label>{" "}
                                {currentDeck.deck_creator}
                            </div>
                            <div>
                                <label>
                                    <strong>Games Played:</strong>
                                </label>{" "}
                                {currentDeck.deck_games_played}
                            </div>
                            <div>
                                <label>
                                    <strong>Games Won:</strong>
                                </label>{" "}
                                {currentDeck.deck_games_won}
                            </div>

                            <Link
                                to={"/decks/" + currentDeck.id}
                                className="badge badge-warning"
                                >
                                    Edit Deck
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Choose a Deck</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}