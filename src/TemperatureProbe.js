import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import 'whatwg-fetch'

class TemperatureProbe extends Component {

  constructor(props) {
    super(props);
    this.state = {temp: 0, tempC: 0};

    this.panelTitle = (
      <h3>Temperature</h3>
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
    fetch('http://raspberrypi.local:3001/temp')
      .then((response) => {
        return response.json()
      }).then((json) => {
        this.setState({
          temp: json.degreesF,
          tempC: json.degreesC
        }); 
      }).catch((ex) => {
        this.setState({
          temp: 0,
          tempC: 0
        });
      })
  }

  render() {
    return (
      <Panel header={this.panelTitle}>
          <p>Fahrenheit: {this.state.temp}</p>
          <p>Celsius: {this.state.tempC}</p>
        </Panel>
    );
  }
}

export default TemperatureProbe;