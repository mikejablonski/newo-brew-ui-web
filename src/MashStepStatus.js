import React, { Component } from 'react';

class MashStepStatus extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  getTimeRemaining = () => {
    if (!this.props.brewSession.currentStepMinutesRemaining) {
      return "N/A";
    }
    
    var result = (this.props.brewSession.currentStepMinutesRemaining * 60).toString().toHHMMSS();
    return result;
  }  

  render() {
    return (
          <div>
            { (this.props.brewSession.step == 3) &&
            <div>
              <p>Mash step {this.props.brewSession.currentMashStep} of {this.props.brewSession.mashSteps.length}</p>
              <p>Mash Step Target: {this.props.brewSession.mashStepTargetTemp}</p>
              <p>Hit Mash Target: {this.props.brewSession.hasHitMashStepTemp.toString()}</p>
              <p>Mash Step Remaining: {this.getTimeRemaining()}</p>
            </div>
            }
          </div>
    );
  }
}

String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
}

export default MashStepStatus;