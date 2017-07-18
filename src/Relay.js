import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import 'whatwg-fetch'

class Relay extends Component {

  constructor(props) {
    super(props);
    this.state = {
        status: -1,
        description: "Unknown",
        buttonAction: "Unknown"
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
    fetch(`http://raspberrypi.local:3001/${this.props.apiUrl}`)
      .then((response) => {
        return response.json()
      }).then((json) => {
        this.setState({
            status: json.status,
            description: json.description,
            buttonAction: json.description === "on" ? "off" : "on"
        });
      }).catch((ex) => {
        this.setState({
          status: -2,
          description: "Error"
        });
      })
  }

  handleClick(e) {
    var newStatus = "on";
    if (this.state.description === "on") {
      newStatus = "off";
    }
    fetch(`http://raspberrypi.local:3001/${this.props.apiUrl}/${newStatus}`,
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
    var style = "success";
    if (this.state.buttonAction == "off") {
      style = "danger";
    }
    return (
        <Panel header={this.props.title}>
            <p>Status: {this.state.description}</p>
            <Button onClick={this.handleClick} bsStyle={style} block>{this.state.buttonAction}</Button>
        </Panel>
    );
  }
}

export default Relay;