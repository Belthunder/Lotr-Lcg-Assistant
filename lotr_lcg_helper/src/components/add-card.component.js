import React, { Component } from "react";
import CardDataService from "../services/card.service";

export default class AddCard extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSphere = this.onChangeSphere.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.saveCard = this.saveCard.bind(this);
        this.newCard = this.newCard.bind(this);

        this.state = {
            id: null,
            card_name: "",
            card_sphere: "",
            card_type: "",
            card_text: "",
            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            card_name: e.target.value
        });
    }

    onChangeSphere(e) {
        this.setState({
            card_sphere: e.target.value
        });
    }

    onChangeType(e) {
        this.setState({
            card_type: e.target.value
        });
    }

    onChangeText(e) {
        this.setState({
            card_text: e.target.value
        });
    }

    saveCard() {
        var data = {
            card_name: this.state.card_name,
            card_sphere: this.state.card_sphere,
            card_type: this.state.card_type,
            card_text: this.state.card_text
        };

        CardDataService.create(data).then(response => {
            this.setState({
                id: response.data.id,
                card_name: response.data.card_name,
                card_sphere: response.data.card_sphere,
                card_type: response.data.card_type,
                card_text: response.data.card_text,
                
                submitted: true
            });
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    newCard() {
        this.setState({
            id: null,
            card_name: "",
            card_sphere: "",
            card_type: "",
            card_text: "",

            submitted: false
        });
    }

    render() {
        return(
            <div className= "submit-form">
                {this.state.submitted? (
                    <div>
                        <h4>
                            Card submitted successfully!
                        </h4>
                        <button className= "btn btn-success" onClick={this.newCard}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className= "form-group">
                            <label htmlFor="card_name">Name</label>
                            <input
                                type="text"
                                className= "form-control"
                                id="card_name"
                                required
                                value={this.state.card_name}
                                onChange={this.onChangeName}
                                name="card_name"
                            />
                        </div>

                        <div className= "form-group">
                            <label htmlFor="card_sphere">Sphere</label>
                            <input
                                type="text"
                                className= "form-control"
                                id="card_sphere"
                                required
                                value={this.state.card_sphere}
                                onChange={this.onChangeSphere}
                                name="card_sphere"
                            />
                        </div>

                        <div className= "form-group">
                            <label htmlFor="card_type">Card Type</label>
                            <input
                                type="text"
                                className= "form-control"
                                id="card_type"
                                required
                                value={this.state.card_type}
                                onChange={this.onChangeType}
                                name="card_type"
                            />
                        </div>
                        <div className= "form-group">
                            <label htmlFor="card_text">Card Text</label>
                            <input
                                type="text"
                                className= "form-control"
                                id="card_text"
                                required
                                value={this.state.card_text}
                                onChange={this.onChangeText}
                                name="card_text"
                            />
                        </div>

                        <button onClick={this.saveCard} className="btn btn-success">
                            Submit Card
                        </button>
                    </div>
                )}
            </div>
        );
    }
}