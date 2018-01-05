import React, { Component } from 'react';

class BrewSessionStep extends Component {

  constructor(props) {
    super(props);

    this.state = {description: '', step: 0, hasHitMashStepTemp: false, hasHitBoilStepTemp: false};
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
          hasHitMashStepTemp: nextProps.brewSession.hasHitMashStepTemp,
          hasHitBoilStepTemp: nextProps.brewSession.hasHitBoilStepTemp
        });

      switch (nextProps.brewSession.step) {
          case 1:
            this.setState({description: 'Heat Strike Water (1/5)', step: 1});
            break;
        case 2:
            this.setState({description: 'Transfer Water to MT (2/5)', step: 2});
            break;
        case 3:
            this.setState({description: 'Mash (3/5)', step: 3});
            break;
        case 4:
            this.setState({description: 'Transfer to BK (4/5)', step: 4});
            break;
        case 5:
            this.setState({description: 'Boil (5/5)', step: 5});
            break;
        case 6:
            this.setState({description: 'Done', step: 6});
            break;
        default:
            break;
      }
  }

  render() {
    return (
        <div>
            <p>Step: {this.state.description}</p>
        </div>
    );
  }
}

export default BrewSessionStep;