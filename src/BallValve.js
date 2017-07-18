import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import 'whatwg-fetch'

class BallValve extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valveStatus: -1,
            description: "Unknown",
            buttonAction: "Unknown"
        };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);

        this.panelTitle = (
            <h3>Valve {this.props.valve}</h3>
        );
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
                        this.setState({
                            description: "Boil Kettle",
                            buttonAction: "Drain Mash Tun"
                        });
                    }
                    else {
                        this.setState({
                            description: "Mash Tun",
                            buttonAction: "Drain Boil Kettle"
                        });
                    }
                    break;
                case "2":
                default:
                    if (this.state.valveStatus === 0) {
                        this.setState({
                            description: "Boil Kettle",
                            buttonAction: "Fill Mash Tun"
                        });
                    }
                    else {
                        this.setState({
                            description: "Mash Tun",
                            buttonAction: "Fill Boil Kettle"
                        });
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
            <Panel header={this.props.description}>
                <p>Position: {this.state.description}</p>
                <p><Button bsStyle="primary" onClick={this.handleClick} block>Move</Button></p>
            </Panel>
        );
    }
}

export default BallValve;