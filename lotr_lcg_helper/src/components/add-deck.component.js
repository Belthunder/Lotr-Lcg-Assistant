import React, { Component } from "react";
import DeckDataService from "../services/deck.service";

export default class AddDeck extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCreator = this.onChangeCreator.bind(this);
        this.onChangeGamesPlayed = this.onChangeGamesPlayed.bind(this);
        this.onChangeGamesWon = this.onChangeGamesWon.bind(this);
        this.saveDeck = this.saveDeck.bind(this);
        this.newDeck = this.newDeck.bind(this);

        this.state = {
            id: null,
            deck_name: "",
            deck_creator: "",
            deck_games_played: 0,
            deck_games_won: 0
        };
    }

    onChangeName(e) {
        this.setState({
            deck_name: e.target.value
        });
    }

    onChangeCreator(e) {
        this.setState({
            deck_creator: e.target.value
        });
    }

    onChangeGamesPlayed(e) {
        this.setState({
            deck_games_played: e.target.value
        });
    }

    onChangeGamesWon(e) {
        this.setState({
            deck_games_won: e.target.value
        });
    }

    saveDeck() {
        var data = {
            deck_name: this.state.deck_name,
            deck_creator: this.state.deck_creator,
            deck_games_played: this.state.deck_games_played,
            deck_games_won: this.state.deck_games_won
        };

        DeckDataService.create(data).then(response => {
            this.setState({
                id: response.data.id,
                deck_name: response.data.deck_name,
                deck_creator: response.data.deck_creator,
                deck_games_played: response.data.deck_games_played,
                deck_games_won: response.data.deck_games_played,

                submitted: true
            });
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        });
    }


    newDeck() {
        this.setState({
            id: null,
            deck_name: "",
            deck_creator: "",
            deck_games_played: 0,
            deck_games_won: 0,

            submitted: false
        });
    }

    render() {
        return(
            <div className= "submit-form">
                {this.state.submitted? (
                    <div>
                        <h4>
                            Deck submitted successfully!
                        </h4>
                        <button className="btn btn-success" onClick={this.newCard}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="deck_name">Deck Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="deck_name"
                                required
                                value={this.state.deck_name}
                                onChange={this.onChangeName}
                                name="deck_name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="deck_creator">Deck Creator</label>
                            <input
                                type="text"
                                className="form-control"
                                id="deck_creator"
                                required
                                value={this.state.deck_creator}
                                onChange={this.onChangeCreator}
                                name="deck_creator"
                            />    
                        </div>

                        <div className="form-group">
                            <label htmlFor="deck_games_played">Games Played</label>
                            <input
                                type="number"
                                className="form-control"
                                id="deck_games_played"
                                required
                                value={this.deck_games_played}
                                onChange={this.onChangeGamesPlayed}
                                name="deck_games_played"
                            />    
                        </div>

                        <div className="form-group">
                            <label htmlFor="deck_games_won">Games Won</label>
                            <input
                                type="number"
                                className="form-control"
                                id="deck_games_won"
                                required
                                value={this.deck_games_won}
                                onChange={this.onChangeGamesWon}
                                name="deck_games_won"
                            />
                        </div>

                        <button onClick={this.saveDeck} className="btn btn-success">
                            Submit Deck
                        </button>
                    </div>                        
                )}
            </div>
        );
    }
}