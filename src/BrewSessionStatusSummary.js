import React, { Component } from 'react';
import { Panel, Button, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import BrewSessionStatus from './BrewSessionStatus';
import BrewSessionStep from './BrewSessionStep';
import MashStepStatus from './MashStepStatus';
import {toHHMMSS} from './lib/DateTimeFormatting';
import 'whatwg-fetch'
var timediff = require('timediff');

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
        this.setState({
          isBrewSessionRunning: json.isBrewSessionRunning
        });
        if (json.isBrewSessionRunning && json.brewSession) {
          this.setState({
            brewSession: json.brewSession
          });
        }
      }).catch((ex) => {
        console.log('Exception!');
        this.setState({
            isBrewSessionRunning: false
        });
      })
  }

  stop = () => {
    fetch('http://raspberrypi.local:3001/brew/stop', {
      method: 'POST'
    })
      .then((response) => {
        return response.json()
      }).then((json) => {
      }).catch((ex) => {
        console.log('Exception on stop!');
      })
  }

  getTotalTimeElapsed = () => {
    if (!this.state.brewSession.lastStarted) {
      return "N/A";
    }
    
    var dateStarted = new Date(this.state.brewSession.lastStarted);
    var dateNow = new Date(Date.now());

    var theDiff = timediff(dateStarted, dateNow, 'S');
    return toHHMMSS(theDiff.seconds.toString());
  }

  getTimeRemaining = () => {
    if (!this.state.brewSession.minutesRemaining) {
      return "N/A";
    }
    
    var secondsRemaining = this.state.brewSession.minutesRemaining * 60;

    var result = toHHMMSS(secondsRemaining.toString());
    return result;
  }   

  render() {
    return (
        <Panel header={this.panelTitle}>
            {this.state.isBrewSessionRunning && this.state.brewSession && 
                <div>
                    <p>{this.state.brewSession.name} ({this.state.brewSession.$loki})</p>
                    <BrewSessionStatus status={this.state.brewSession.status} />
                    <p>Time Started: {new Date(this.state.brewSession.lastStarted).toLocaleTimeString()}</p>
                    <p>Time Elapsed: {this.getTotalTimeElapsed()}</p>
                    <p>Time Remaining: {this.getTimeRemaining()}</p>
                    <BrewSessionStep brewSession={this.state.brewSession} />
                    <MashStepStatus brewSession={this.state.brewSession} />
                    <Button onClick={this.stop} bsStyle="danger">Stop</Button>
                </div>
            }
            {!this.state.isBrewSessionRunning && 
              <div>
                <p>System Off</p>
                <LinkContainer to="/session">
                  <Button bsStyle="primary" block><Glyphicon glyph="grain" /> New Brew Session</Button>
                </LinkContainer>
              </div>
            }
        </Panel>
    );
  }
}

export default BrewSessionStatusSummary;