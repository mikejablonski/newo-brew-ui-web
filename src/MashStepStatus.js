import React, { Component } from 'react';
import {toHHMMSS} from './lib/DateTimeFormatting';

class MashStepStatus extends Component {

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  getTimeRemaining = () => {
    if (!this.props.brewSession.currentStepMinutesRemaining) {
      return "N/A";
    }
    
    var secondsRemaining = this.props.brewSession.currentStepMinutesRemaining * 60;

    var result = toHHMMSS(secondsRemaining.toString());
    return result;
  }  

  render() {
    return (
          <div>
            { (this.props.brewSession.step === 3) &&
            <div>
              <p>Mash Step {this.props.brewSession.currentMashStep} of {this.props.brewSession.mashSteps.length}</p>
              <p>Mash Temp: {this.props.brewSession.mashStepTargetTemp}</p>
              <p>Hit Mash Temp: {this.props.brewSession.hasHitMashStepTemp.toString()}</p>
              <p>Mash Step Remaining: {this.getTimeRemaining()}</p>
            </div>
            }
            { (this.props.brewSession.step === 5) && 
            <div>
              <p>Boil Temp: {this.props.brewSession.boil.tempF}</p>
              <p>Hit Boil Temp: {this.props.brewSession.hasHitBoilStepTemp.toString()}</p>
              <p>Boil Step Remaining: {this.getTimeRemaining()}</p>
            </div>
            }
          </div>
    );
  }
}

export default MashStepStatus;