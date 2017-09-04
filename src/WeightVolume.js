import React, { Component } from 'react';
import { Panel, ControlLabel, FormControl } from 'react-bootstrap';

class WeightVolume extends Component {

  constructor(props) {
    super(props);
    this.state = {containerWeight: 0, emptyContainerWeight: 0, sg: 1, volume: 0};

    this.panelTitle = (
      <h3>Weight Volume Tool</h3>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

    handleContainerWeight = (evt) => {
        this.setState({ containerWeight: evt.target.value });
        this.calcVolume(evt.target.value, this.state.emptyContainerWeight, this.state.sg);
    }

    handleEmptyContainerWeight = (evt) => {
        this.setState({ emptyContainerWeight: evt.target.value });
        this.calcVolume(this.state.containerWeight, evt.target.value, this.state.sg);
    }

    handleSG = (evt) => {
        this.setState({ sg: evt.target.value });
        this.calcWeight(this.state.emptyContainerWeight, evt.target.value, this.state.volume);
        this.calcVolume(this.state.containerWeight, this.state.emptyContainerWeight, evt.target.value);
    }  
    
    handleVolume = (evt) => {
        this.setState({ volume: evt.target.value });
        this.calcWeight(this.state.emptyContainerWeight, this.state.sg, evt.target.value);
    }      

    calcVolume(containerWeight, emptyContainerWeight, sg) {
        var actualWeight = containerWeight - emptyContainerWeight;
        
        // get weight in kg
        var weightInKg = actualWeight * 0.453592;
        
        // divide by sg
        var volumeInCubicMeters = weightInKg / (sg * 1000);
        
        // multiply by 264.172 (1 cubic meter in gallons)
        var volumeInGallons = volumeInCubicMeters * 264.172;

        this.setState({ volume: volumeInGallons });
    }

    calcWeight(emptyContainerWeight, sg, volume) {
        // mass = volume * density

        var volumeInCubicMeters = volume / 264.172;

        var massInKg = volumeInCubicMeters * (sg * 1000);

        var massInLbs = massInKg / 0.453592;

        this.setState({ containerWeight: massInLbs });
    }

  render() {
    let keyboardAttribute = {'pattern': ''};
    let inputStyle = { fontSize: '16px' };
    return (
      <Panel header={this.panelTitle}>
        <ControlLabel>Container Weight (lb)</ControlLabel>
        <FormControl type="text" placeholder="lb" value={this.state.containerWeight} onChange={this.handleContainerWeight} style={inputStyle} {...keyboardAttribute} />
        <br/>
        <ControlLabel>Empty Container Weight (lb)</ControlLabel>
        <FormControl type="text" placeholder="lb" value={this.state.emptyContainerWeight} onChange={this.handleEmptyContainerWeight} style={inputStyle} {...keyboardAttribute} />
        <br/>
        <ControlLabel>Specific Gravity</ControlLabel>
        <FormControl type="text" placeholder="SG" value={this.state.sg} onChange={this.handleSG} style={inputStyle} {...keyboardAttribute} />
        <br/>
        <ControlLabel>Volume (gal)</ControlLabel>
        <FormControl type="text" placeholder="gallons" value={this.state.volume} onChange={this.handleVolume} style={inputStyle} {...keyboardAttribute} />
        <br/>                
        </Panel>
    );
  }
}

export default WeightVolume;