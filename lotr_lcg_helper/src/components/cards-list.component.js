import React, { Component } from "react"
import CardDataService from "../services/card.service"
import { Link } from "react-router-dom"

export default class CardsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveCards = this.retrieveCards.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveCard = this.setActiveCard.bind(this);
        this.removeAllCards = this.removeAllCards.bind(this);
        this.searchName = this.searchName.bind(this);

        this.state = {
            cards: [],
            currentCard: null,
            currentIndex: -1,
            searchName: ""
        };
    }

    componentDidMount() {
        this.retrieveCards();
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

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

    refreshList() {
        this.retrieveCards();
        this.setState({
            currentCard: null,
            currentIndex: -1
        });
    }

    setActiveCard(card, index) {
        this.setState({
            currentCard: card,
            currentIndex: index
        });
    }

    removeAllCards() {
        CardDataService.deleteAll().then(response => {
            this.setState({
                cards: response.data
            });
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    searchName() {
        this.setState({
            currentCard: null,
            currentIndex: -1
        });

        CardDataService.findByName(this.state.searchName).then(response => {
            this.setState({
                cards: response.data
            });
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        });
    }


    render() {
        const { searchName, cards, currentCard, currentIndex } = this.state;

        return(
            <div className="list row">
                <div className= "col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="search by card name"
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
                    <h4>Cards List</h4>
                    <ul className="list-group">
                        {cards && cards.map((card, index) => (
                            <li
                                className={"list-group-item" + (index === currentIndex ? "active" : "")}
                                onClick={() => this.setActiveCard(card, index)}
                                key={index}
                                >
                                    {card.card_name}
                                </li>
                        ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllCards}
                        >
                            Remove All Cards
                        </button>
                </div>
                <div className="col-md-6">
                    {currentCard ? (
                        <div>
                            <h4>Card</h4>
                            <div className="cardListElement">
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentCard.card_name}
                            </div>
                            <div className="cardListElement">
                                <label>
                                    <strong>Sphere:</strong>
                                </label>{" "}
                                {currentCard.card_sphere}
                            </div>
                            <div className="cardListElement">
                                <label>
                                    <strong>Type:</strong>
                                </label>{" "}
                                {currentCard.card_type}
                            </div>
                            <div className="cardListElement">
                                <label>
                                    <strong>Text:</strong>
                                </label>{" "}
                                {currentCard.card_text}
                            </div>

                            <Link
                                to={"/cards/" + currentCard.id}
                                className="badge badge-warning"
                                >
                                    Edit Card
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Choose a Card</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}