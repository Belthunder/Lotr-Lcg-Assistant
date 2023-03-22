import React, { Component } from "react";
import DeckDataService from "../services/deck.service";
import { withRouter } from "../common/with-router";

class DeckStats extends Component {
    constructor(props) {
        super(props);
        this.getDeck = this.getDeck.bind(this);
        this.getDeckWinPercentage = this.getDeckWinPercentage.bind(this);
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

    getDeck(id) {
        DeckDataService.get(id).then(response => {
         this.setState({
             currentDeck: response.data[0]
         });
        }).catch(err => {
         console.log(err);
        }); 
     }

    getDeckWinPercentage(currentDeck) {
        const games_won = currentDeck.deck_games_won;
        console.log(`games won: ${games_won}`);
        const games_played = currentDeck.deck_games_played;
        var win_percentage;
        if(games_played === 0) {
            win_percentage = 0;
        } else {
            win_percentage = ((games_won/games_played) * 100);
        }
        return(
            <div>
                <label>
                    <strong>Win Percentage:</strong>
                    </label>{" "}
                    {win_percentage}
            </div>
        )
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
        const getDeckWinPercentage = this.getDeckWinPercentage(currentDeck) 

        return (
            <div>
                {currentDeck ? (
                    <div className="edit-form">
                        <h4>{currentDeck.deck_name}</h4>
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
                            {getDeckWinPercentage}
                        <button
                            className="badge badge-danger mr-2"
                            onClick={() => this.deleteDeck}
                        >
                            Delete Deck
                        </button>
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

export default withRouter(DeckStats);