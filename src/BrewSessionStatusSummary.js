import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import BrewSessionStatus from './BrewSessionStatus';
import BrewSessionStep from './BrewSessionStep';
import 'whatwg-fetch'

class BrewSessionStatusSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {isBrewSessionRunning: false};

    this.panelTitle = (
      <h3>Now Brewing</h3>
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
    fetch('http://raspberrypi.local:3001/brew')
      .then((response) => {
        return response.json()
      }).then((json) => {
        console.log(json.isBrewSessionRunning);
        this.setState({
          isBrewSessionRunning: json.isBrewSessionRunning
        });
        if (json.isBrewSessionRunning && json.brewSession) {
          this.setState({
            brewSession: json.brewSession
          });
        }
      }).catch((ex) => {
        console.log('ex');
        this.setState({
            isBrewSessionRunning: false
        });
      })
  }

  render() {
    return (
        <Panel header={this.panelTitle}>
            {this.state.isBrewSessionRunning && this.state.brewSession && 
                <div>
                    <p>{this.state.brewSession.name}</p>
                      <BrewSessionStatus status={this.state.brewSession.status} /> 
                      <BrewSessionStep brewSession={this.state.brewSession} />
                </div>
            }
            {!this.state.isBrewSessionRunning && 
              <p>Off</p>
            }
        </Panel>
    );
  }
}

export default BrewSessionStatusSummary;