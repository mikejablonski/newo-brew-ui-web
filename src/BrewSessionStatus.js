import React, { Component } from 'react';

class BrewSessionStatus extends Component {

  constructor(props) {
    super(props);

    this.state = {description: ''};
  }

  componentWillReceiveProps(nextProps) {
      switch (nextProps.status) {
          case 1:
            this.setState({description: 'Stopped'});
            break;
        case 2:
            this.setState({description: 'Running'});
            break;
        case 3:
            this.setState({description: 'Complete'});
            break;
        default:
            break;
      }
  }

  render() {
    return (
      <p>Status: {this.state.description}</p>
    );
  }
}

export default BrewSessionStatus;