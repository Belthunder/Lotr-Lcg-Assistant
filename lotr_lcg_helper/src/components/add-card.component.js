import React, { Component } from "react";
import CardDataService from "../services/card.service";

export default class AddCard extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSphere = this.onChangeSphere.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeText = this.onChangeText.bind(this);

        this.state = {
            id: null,
            name: "",
            sphere: "",
            type: "",
            text: "",
            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeSphere(e) {
        this.setState({
            sphere: e.target.value
        });
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
        });
    }

    onChangeText(e) {
        this.setState({
            text: e.target.value
        });
    }

    saveCard() {
        var data = {
            name: this.state.name,
            sphere: this.state.sphere,
            type: this.state.type,
            text: this.state.text
        };

        CardDataService.create(data).then(response => {
            this.setState({
                id: response.data.id,
                name: response.data.name,
                sphere: response.data.sphere,
                type: response.data.type,
                text: response.data.text,
                
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
            name: "",
            sphere: "",
            type: "",
            text: "",

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
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className= "form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
                                name="name"
                            />
                        </div>

                        <div className= "form-group">
                            <label htmlFor="sphere">Sphere</label>
                            <input
                                type="text"
                                className= "form-control"
                                id="sphere"
                                required
                                value={this.state.sphere}
                                onChange={this.onChangeSphere}
                                name="sphere"
                            />
                        </div>

                        <div className= "form-group">
                            <label htmlFor="type">Card Type</label>
                            <input
                                type="text"
                                className= "form-control"
                                id="text"
                                required
                                value={this.state.text}
                                onChange={this.onChangeText}
                                name="text"
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