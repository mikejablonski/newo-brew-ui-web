import React, { Component } from 'react';
import { Panel, Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl, Glyphicon } from 'react-bootstrap';

class Session extends Component { 

    constructor(props) {
        super(props);

        this.state = {
            name: "Ballard Summer Pale",
            mashSteps: [
                { temp: 152, time: 40 },
                { temp: 170, time: 20 }
            ],
            boil: {
                time: 60,
                temp: 207
            },
            id: 0
        };
    }

    componentDidMount() {
        if (this.props.match.params.sessionId) {
            this.setState({id: this.props.match.params.sessionId});
            this.getBrewSession(this.props.match.params.sessionId);
        }
    }

    removeMashStep = (idx) => () => {
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

    handleNameChange = (evt) => {
        this.setState({ name: evt.target.value });
    }

    getBrewSession = (sessionId) => {
        fetch(`http://raspberrypi.local:3001/brewSession/${sessionId}`)
        .then((response) => {
            return response.json()
        }).then((json) => {
            this.setState({
                name: json.name,
                mashSteps: json.mashSteps,
                boil: json.boil
            }); 
        }).catch((ex) => {
            this.setState({
                temp: 0
            });
        })      
    }

    saveBrewSession = () => {

        var postBody = {};
        postBody.name = this.state.name;
        postBody.mashSteps = this.state.mashSteps;
        postBody.boil = this.state.boil;

        fetch(`http://raspberrypi.local:3001/brew/save`, 
        {
            method: 'POST',
            body: JSON.stringify(postBody),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                console.log('Error!');
            }
            return response.json();
        }).then((json) => {
            this.setState({ id: json.id });
            this.startBrewing();
        }).catch((ex) => {
            console.log('Exception!');
        });      
    }

    startBrewing = () => {
        var postBody = {};
        postBody.sessionId = this.state.id;

        fetch(`http://raspberrypi.local:3001/brew/start`, 
        {
            method: 'POST',
            body: JSON.stringify(postBody),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                console.log('Error!');
            }
            return response.json();
        }).then((json) => {
            // redirect to the brew page
            this.props.history.push('/brew');
        }).catch((ex) => {
            console.log('Exception!');
        });      

    }

  render() {
    let keyboardAttribute = {'pattern': '\\d*'};
    return (
        <div>
            <form>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <FormGroup controlId="name">
                                <ControlLabel>Session Name</ControlLabel>
                                <FormControl type="text" placeholder="Name" value={this.state.name}
                                    onChange={this.handleNameChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Panel>
                        <Row>
                            {
                                this.state.mashSteps.map((step, idx) =>
                                    <Col xs={6} sm={6} md={3} key={idx}>
                                        <Panel header={`Mash Step ${idx+1}`}>
                                            <FormGroup
                                                controlId={`MashStep${idx}`}>
                                                <ControlLabel>Temp</ControlLabel>
                                                <FormControl type="text" placeholder="Deg" value={step.temp} onChange={this.handleMashTempChange(idx)} {...keyboardAttribute} />
                                                <ControlLabel>Time</ControlLabel>
                                                <FormControl type="text" placeholder="Min" value={step.time} onChange={this.handleMashHoldChange(idx)} {...keyboardAttribute} />
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
                                        <FormControl type="text" placeholder="Deg" value={this.state.boil.temp} onChange={this.handleBoilTempChange} {...keyboardAttribute} />
                                        <ControlLabel>Time</ControlLabel>
                                        <FormControl type="text" placeholder="Min" value={this.state.boil.time} onChange={this.handleBoilTimeChange} {...keyboardAttribute} />
                                    </FormGroup>
                                </Panel>
                            </Col>                       
                        </Row>
                    </Panel>  
                    <Row>
                        <Col xs={12}>
                            <Button onClick={this.saveBrewSession}>Brew</Button>
                        </Col>
                    </Row>               
                </Grid>
            </form>
        </div>

    );
  }
}

export default Session;