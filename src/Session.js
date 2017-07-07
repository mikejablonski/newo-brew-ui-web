import React, { Component } from 'react';
import { Panel, Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Glyphicon } from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class Session extends Component { 

  constructor(props) {
    super(props);

    this.state = {
        mashSteps: [
            { temp: 152, time: 60 },
            { temp: 170, time: 20 },
            { temp: 180, time: 10 },
            { temp: 190, time: 5 }
        ],
        boil: {
            time: 60,
            temp: 207
        }
    };
  }

  removeMashStep = (idx) => () => {
    console.log(idx);
    this.setState({
        mashSteps: this.state.mashSteps.filter((s, sidx) => idx !== sidx)
    });
  }

  addMashStep = () => {
      this.setState({
          mashSteps: [...this.state.mashSteps, { temp: 0, time: 0} ]
      })
  }

  handleMashTempChange = (idx) => (evt) => {
      const newMashSteps = this.state.mashSteps.map((mashStep, sidx) => {
          if (idx !== sidx) return mashStep;
          return { ...mashStep, temp: evt.target.value }
      });

      this.setState({ mashSteps: newMashSteps });
  }

  handleMashHoldChange = (idx) => (evt) => {
      const newMashSteps = this.state.mashSteps.map((mashStep, sidx) => {
          if (idx !== sidx) return mashStep;
          return { ...mashStep, time: evt.target.value }
      });

      this.setState({ mashSteps: newMashSteps });
  }

  handleBoilTimeChange = (evt) => {
      const newBoil = { ...this.state.boil, time: evt.target.value };
      this.setState({ boil: newBoil });
  } 

  handleBoilTempChange = (evt) => {
      const newBoil = { ...this.state.boil, temp: evt.target.value };
      this.setState({ boil: newBoil });
  } 

  render() {
    return (
        <div>
            <form>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <FieldGroup
                                id="formControlsSessionName"
                                type="text"
                                label="Session Name"
                                placeholder="Name"
                            />
                        </Col>
                    </Row>
                    <Panel>
                        <Row>
                            {
                                this.state.mashSteps.map((step, idx) =>
                                    <Col xs={6} sm={6} md={3} key={idx}>
                                        <Panel header={`Mash Step ${idx}`}>
                                            <FormGroup
                                                controlId={`MashStep${idx}`}>
                                                <ControlLabel>Temp</ControlLabel>
                                                <FormControl type="text" placeholder="Deg" value={step.temp} onChange={this.handleMashTempChange(idx)}/>
                                                <ControlLabel>Time</ControlLabel>
                                                <FormControl type="text" placeholder="Min" value={step.time} onChange={this.handleMashHoldChange(idx)}/>
                                                <Button onClick={this.removeMashStep(idx)}><Glyphicon glyph="remove-sign" />{' '}Remove</Button>
                                            </FormGroup>
                                        </Panel>
                                    </Col>
                                )
                            }
                        </Row>
                        <Row>
                            <Col xs={6} sm={6} md={3}>
                                <Button onClick={this.addMashStep}><Glyphicon glyph="plus-sign" />{' '}Add Step</Button>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel>
                        <Row>
                            <Col xs={6} sm={6} md={3}>
                                <Panel header="Boil">
                                    <FormGroup
                                        controlId="test">
                                        <ControlLabel>Temp</ControlLabel>
                                        <FormControl type="text" placeholder="Deg" value={this.state.boil.temp} onChange={this.handleBoilTempChange} />
                                        <ControlLabel>Time</ControlLabel>
                                        <FormControl type="text" placeholder="Min" value={this.state.boil.time} onChange={this.handleBoilTimeChange} />
                                    </FormGroup>
                                </Panel>
                            </Col>                       
                        </Row>
                    </Panel>  
                    <Row>
                        <Col xs={12}>
                            <Button>Brew</Button>
                        </Col>
                    </Row>               
                </Grid>
            </form>
        </div>

    );
  }
}

export default Session;