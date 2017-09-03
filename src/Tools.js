import React, { Component } from 'react';
import { Table, Glyphicon, Button, ButtonToolbar } from 'react-bootstrap';
import WeightVolume from './WeightVolume';

class Tools extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    
  render() {
    return (
        <div>
            <WeightVolume />
        </div>

    );
  }
}

export default Tools;