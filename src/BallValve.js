import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import 'whatwg-fetch'

class BallValve extends Component {

    constructor(props) {
        super(props);
        this.state = {valveStatus: -1};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            2000
        );      
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        fetch(`http://raspberrypi.local:3001/valve/${this.props.valve}`)
        .then((response) => {
            return response.json()
        }).then((json) => {
            this.setState({
                valveStatus: json.status
            }); 
        }).catch((ex) => {
            this.setState({
                valveStatus: -2
            });
        })
    }    

    handleClick(e) {
        console.log('pushed button');
        var newValue = 0;
        if (this.state.valveStatus == "0") {
            newValue = 1;
        }

        fetch(`http://raspberrypi.local:3001/valve/${this.props.valve}/${newValue}`,
        {
            method: "POST"
        })
            .then((response) => {
                return response.json()
            }).then((json) => { 
            }).catch((ex) => {
            })
    }

    render() {
        return (
            <div>
                <p>Valve Number: {this.props.valve}</p>
                <p>Status: {this.state.valveStatus}</p>
                <p><Button bsStyle="primary" onClick={this.handleClick}>Push Me</Button></p>
            </div>
        );
    }
}

export default BallValve;