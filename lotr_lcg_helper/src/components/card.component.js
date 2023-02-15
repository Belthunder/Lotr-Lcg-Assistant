import React, { Component } from "react";
import CardDataService from "../services/card.service";
import { withRouter } from "../common/with-router";

class Card extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSphere = this.onChangeSphere.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.updateCard  = this.updateCard.bind(this);
        this.getCard = this.getCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        
        this.state = {
            currentCard: {
                id: null,
                card_name: "",
                card_sphere: "",
                card_type: "",
                card_text: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getCard(this.props.router.params.id);
    }

    onChangeName(e) {
        const card_name = e.target.value;

        this.setState(function(prevState) {
            return { 
                currentCard: {
                    ...prevState.currentCard,
                    card_name: card_name
                }
            };
        });
    }

    onChangeSphere(e) {
        const card_sphere = e.target.value;

        this.setState(prevState => ({
            currentCard: {
                ...prevState.currentCard,
                card_sphere: card_sphere
            }
        }));
    }

    onChangeType(e) {
        const card_type = e.target.value;

        this.setState(prevState => ({
            currentCard: {
                ...prevState.currentCard,
                card_type: card_type
            }
        }));
    }

    onChangeText(e) {
        const card_text = e.target.value;

        this.setState(prevState => ({
            currentCard: {
                ...prevState.currentCard,
                card_text: card_text
            }
        }));
    }

    getCard(id) {
        CardDataService.get(id).then(response => {
            this.setState({
                currentCard: response.data
            });
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    updateCard() {
        CardDataService.update(
            this.state.currentCard.id,
            this.state.currentCard
        ).then(response => {
            console.log(response.data);
            this.setState({
                message: "The card was successfully updated!"
            });
        }).catch(err => {
            console.log(err);
        });
    }

    deleteCard() {
        CardDataService.delete(this.state.currentCard.id)
            .then(response => {
                console.log(response.data);
                this.props.router.navigate('/cards');
            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        const { currentCard } = this.state;

        return(
            <div>
                {currentCard ? (
                    <div className="edit-form">
                        <h4>Card</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentCard.card_name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="sphere">Sphere</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="sphere"
                                    value={currentCard.card_sphere}
                                    onChange={this.onChangeSphere}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="type">Card Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="type"
                                    value={currentCard.card_type}
                                    onChange={this.onChangeType}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="text">Card Text</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="text"
                                    value={currentCard.text}
                                    onChange={this.onChangeText}
                                />
                            </div>
                        </form>

                        <button
                            className="badge badge-danger mr-2"
                            onClick={() => this.deleteCard}
                        >
                            Delete Card
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateCard}
                        >
                            Update Card
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please choose a card</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(Card);