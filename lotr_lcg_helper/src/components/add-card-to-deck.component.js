import React, { Component } from "react";
import DeckDataService from "../services/deck.service";
import CardDataService from "../services/card.service";

//

export default class AddCardToDeck extends Component {
    constructor(props) {
        super(props)

        this.onChangeCard = this.onChangeCard.bind(this);
        this.onChangeDeck = this.onChangeDeck.bind(this);
        this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
        this.retrieveCards = this.retrieveCards.bind(this);
        this.retrieveDecks = this.retrieveDecks.bind(this);
        this.saveBind = this.saveBind.bind(this);
        this.newBind = this.newBind.bind(this);

        this.state = {
            card_id: "1",
            deck_id: "1",
            card_number: 0,

            submitted: false
        };
    }

    componentDidMount() {
        this.retrieveCards();
        this.retrieveDecks();
    }

    //grabs all current cards from database, stores them in state.
    retrieveCards() {
        CardDataService.getAll().then(response => {
            this.setState({
                cards: response.data
            });
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    //grabs all current decks from database, stores them in state.
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

    //set the current card in the state to the target card.
    onChangeCard(e) {
        this.setState({
            card_id: e.target.value
        });
    }

    onChangeDeck(e) {
        this.setState({
            deck_id: e.target.value
        });
    }

    onChangeCardNumber(e) {
        this.setState({
            card_number: e.target.value
        });
    }

    //inserts a new entry in the card-deck join table using the provided card and deck saved in the state object.
    saveBind() {
        var data = {
            card_id: this.state.card_id,
            deck_id: this.state.deck_id,
            card_number: this.state.card_number
        }

        DeckDataService.addCardToDeck(data).then(response => {
            this.setState({
                card_id: response.data.card_id,
                deck_id: response.data.deck_id,
                card_number: response.data.card_number,

                submitted: true
            });
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    //reset the state object information after a new card is added.
    newBind() {
        this.setState({
            card_id: null,
            deck_id: null,
            card_number: 0,

            submitted: false
        });
    }

    render() {
        const { decks, cards } = this.state;
        return (
            <div className="submit-form">
                {this.state.submitted? (
                    <div>
                        <h4>
                           Card has been added to deck! 
                        </h4>
                        <button className="btn btn-success" onClick={this.newBind}>
                            Add another card.
                        </button>
                    </div>
                ) : (
                  <div>
                    <div className="form-group">
                        <label htmlFor="deck_id">Deck</label>
                        <select name = "deck_id" id="deck_id" onChange={this.onChangeDeck}>
                            { decks && decks.map((deck) => (
                                <option key={deck.id} value={deck.id}>{deck.deck_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="card_id">Card</label>
                        <select name = "card_id" id="card_id" onChange={this.onChangeCard}>
                            { cards && cards.map((card) => (
                                <option key={card.id} value={card.id}>{card.card_name} ({card.card_sphere})</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="card_number">Number in Deck</label>
                        <input
                                type="number"
                                className="form-control"
                                id="card_number"
                                required
                                value={this.card_number}
                                onChange={this.onChangeCardNumber}
                                name="card_number"
                            />
                    </div>

                    <button onClick={this.saveBind} className="btn btn-success">
                        Add Card to Deck
                    </button>
                </div>
                )}
            </div>
        );
    }
}