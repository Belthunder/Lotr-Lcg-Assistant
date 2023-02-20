import React, { Component } from "react";
import DeckDataService from "../services/deck.service";
import CardDataService from "../services/card.service";

export default class AddCardToDeck extends Component {
    constructor(props) {
        super(props)

        this.onChangeCard = this.onChangeCard.bind(this);
        this.onChangeDeck = this.onChangeDeck.bind(this);
        this.saveBind = this.saveBind.bind(this);

        this.state = {
            card_id: "",
            deck_id: ""
        };
    }

    onChangeCard(e) {
        
    }
}