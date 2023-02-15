import React, { Component } from "react";
import DeckDataService from "../services/deck.service";
import { withRouter } from "../common/with-router";

class Deck extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCreator = this.onChangeCreator.bind(this);
        this.onChangeGamesPlayed = this.onChangeGamesPlayed.bind(this);
        this.onChangeGamesWon = this.onChangeGamesWon.bind(this);
        this.updateDeck = this.updateDeck.bind(this);
        this.getDeck = this.getDeck.bind(this);
        this.deleteDeck = this.deleteDeck.bind(this);

        this.state = {
            currentDeck: {
                id: null,
                deck_name: "",
                deck_creator: "",
                deck_games_played: 0,
                deck_games_won: 0
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getDeck(this.props.router.params.id);
    }

    onChangeName(e) {
        const deck_name = e.target.value;

        this.setState(function(prevState) {
            return {
                currentDeck: {
                    ...prevState.currentDeck,
                    deck_name: deck_name
                }
            };
        });
    }

    onChangeCreator(e) {
        const deck_creator = e.target.value;

        this.setState(prevState => ({
            currentDeck: {
                ...prevState.currentDeck,
                deck_creator: deck_creator
            }
        }));
    }

    onChangeGamesPlayed(e) {
        const games_played = e.target.value;

        this.setState(prevState => ({
            currentDeck: {
                ...prevState.currentDeck,
                deck_games_played: games_played
            }
        }));
    }

    onChangeGamesWon(e) {
        const games_won = e.target.value;

        this.setState(prevState => ({
            currentDeck: {
                ...prevState.currentDeck,
                deck_games_won: games_won
            }
        }));
    }

    getDeck(id) {
       DeckDataService.get(id).then(response => {
        this.setState({
            currentDeck: response.data
        });
        console.log(response.data);
       }).catch(err => {
        console.log(err);
       }); 
    }

    updateDeck() {
        DeckDataService.update(
            this.state.currentDeck.id,
            this.state.currentDeck
        ).then(response => {
            console.log(response.data);
            this.setState({
                message: "The deck was successfully updated!"
            });
        }).catch(err => {
            console.log(err);
        });
    }

    deleteDeck() {
        DeckDataService.delete(this.state.currentDeck.id)
        .then(response => {
            console.log(response.data);
            this.props.router.navigate('/decks');
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const { currentDeck } = this.state;

        return(
            <div>
                {currentDeck ? (
                    <div className="edit-form">
                        <h4>Deck</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Deck Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentDeck.deck_name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="creator">Deck Creator</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="creator"
                                    value={currentDeck.deck_creator}
                                    onChange={this.onChangeCreator}
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="games_played">Games Played</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="games_played"
                                    value={currentDeck.deck_games_played}
                                    onChange={this.onChangeGamesPlayed}
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="games_won">Games Won</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="games_won"
                                    value={currentDeck.deck_games_won}
                                    onChange={this.onChangeGamesPlayed}
                                />
                            </div>
                        </form>

                        <button
                            className="badge badge-danger mr-2"
                            onClick={() => this.deleteDeck}
                        >
                            Delete Deck
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateDeck}
                        >
                            Update Deck
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please choose a deck</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(Deck);