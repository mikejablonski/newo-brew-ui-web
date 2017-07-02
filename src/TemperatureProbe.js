import React, { Component } from 'react';
import 'whatwg-fetch'

class TemperatureProbe extends Component {

  constructor(props) {
    super(props);
    this.state = {temp: 33};
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
          temp: json.degreesF
        }); 
      }).catch((ex) => {
        this.setState({
          temp: 0
        });
      })
  }

  render() {
    return (
        <div>
            <p>Current Temperature: {this.state.temp}</p>
        </div>
    );
  }
}

export default TemperatureProbe;