import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import 'whatwg-fetch'

class BallValve extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valveStatus: -1,
            description: "Unknown"
        };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
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

            switch (this.props.valve) {
                case "1":
                    if (this.state.valveStatus === 0) {
                        this.setState({description: "Drain BK"});
                    }
                    else {
                        this.setState({description: "Drain MT"});
                    }
                    break;
                case "2":
                default:
                    if (this.state.valveStatus === 0) {
                        this.setState({description: "Fill BK"});
                    }
                    else {
                        this.setState({description: "Fill MT"});
                    }
                    break;
            }
        }).catch((ex) => {
            this.setState({
                valveStatus: -2
            });
        })
    }    

    handleClick(e) {
        var newValue = 0;
        if (this.state.valveStatus === 0) {
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
                <p>Description: {this.state.description}</p>
                <p><Button bsStyle="primary" onClick={this.handleClick}>Push Me</Button></p>
            </div>
        );
    }
}

export default BallValve;