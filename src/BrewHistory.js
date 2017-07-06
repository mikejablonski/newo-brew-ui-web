import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

class BrewHistory extends Component {  
  render() {
    return (
        <div>
            <Jumbotron>
                <h1>History</h1>
                <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            </Jumbotron>
        </div>

    );
  }
}

export default BrewHistory;