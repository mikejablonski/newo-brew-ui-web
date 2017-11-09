import React, { Component } from 'react';
import { Panel, Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl, Glyphicon } from 'react-bootstrap';

class Session extends Component { 

    constructor(props) {
        super(props);

        this.state = {
            name: "Ballard Summer Pale",
            mashSteps: [
                { temp: 66.67, tempF: 152, time: 40 },
                { temp: 76.67, tempF: 170, time: 20 }
            ],
            boil: {
                time: 60,
                temp: 97.22,
                tempF: 207
            },
            id: 0
        };
    }

    cToF(celsius) {
        var cTemp = celsius;
        var cToFahr = cTemp * 9 / 5 + 32;
        return Number(cToFahr).toFixed(2);
    }

    fToC(fahrenheit) {
        var fTemp = fahrenheit;
        var fToCel = (fTemp - 32) * 5 / 9;
        return Number(fToCel).toFixed(2);
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
            mashSteps: [...this.state.mashSteps, { temp: 0, tempF: 0, time: 0} ]
        })
    }

    handleMashTempChange = (idx) => (evt) => {
        const newMashSteps = this.state.mashSteps.map((mashStep, sidx) => {
            if (idx !== sidx) return mashStep;
            return { ...mashStep, temp: evt.target.value, tempF: this.cToF(evt.target.value) }
        });

        this.setState({ mashSteps: newMashSteps });
    }

    handleMashTempFChange = (idx) => (evt) => {
        const newMashSteps = this.state.mashSteps.map((mashStep, sidx) => {
            if (idx !== sidx) return mashStep;
            return { ...mashStep, temp: this.fToC(evt.target.value),  tempF:evt.target.value  }
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
        const newBoil = { ...this.state.boil, temp: evt.target.value, tempF: this.cToF(evt.target.value) };
        this.setState({ boil: newBoil });
    }

    handleBoilTempFChange = (evt) => {
        const newBoil = { ...this.state.boil, temp: this.fToC(evt.target.value), tempF: evt.target.value };
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

    saveBrewSession = (simulate) => () => {

        var postBody = {};
        postBody.name = this.state.name;
        postBody.mashSteps = this.state.mashSteps;
        // delete any mash start and stop time data
        for (var i=0; i < postBody.mashSteps.length; i++) {
            var mashStep = postBody.mashSteps[i];
            delete mashStep.mashEndTime;
            delete mashStep.mashStartTime;
            delete mashStep.formattedMashEndTime;
            delete mashStep.formattedMashStartTime;
        }
        postBody.boil = this.state.boil;
        // delete any boil start and stop data
        delete postBody.boil.boilEndTime;
        delete postBody.boil.boilStartTime;
        delete postBody.boil.formattedBoilEndTime;
        delete postBody.boil.formattedBoilStartTime;

        var url = 'http://raspberrypi.local:3001/brew/save';

        fetch(url, 
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
            this.startBrewing(simulate);
        }).catch((ex) => {
            console.log('Exception!');
        });      
    }

    startBrewing = (simulate) => {
        var postBody = {};
        postBody.sessionId = this.state.id;

        var url = 'http://raspberrypi.local:3001/brew/start';
        if (simulate) {
            url = 'http://raspberrypi.local:3001/brew/simulate';
        }
        fetch(url, 
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
    let inputStyle = { fontSize: '16px' };
    return (
        <div>
            <form>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <FormGroup controlId="name">
                                <ControlLabel>Session Name</ControlLabel>
                                <FormControl type="text" placeholder="Name" value={this.state.name} style={inputStyle}
                                    onChange={this.handleNameChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Panel>
                        <Row>
                            {
                                this.state.mashSteps.map((step, idx) =>
                                    <Col xs={12} sm={6} md={3} key={idx}>
                                        <Panel header={`Mash Step ${idx+1}`}>
                                            <FormGroup
                                                controlId={`MashStep${idx}`}>
                                                <Row>
                                                    <Col xs={6} sm={6} md={6}>
                                                        <ControlLabel>Temp F</ControlLabel>
                                                        <FormControl type="text" placeholder="DegF" value={step.tempF} onChange={this.handleMashTempFChange(idx)} style={inputStyle} {...keyboardAttribute} />
                                                        <br/>
                                                    </Col>                                                    
                                                    <Col xs={6} sm={6} md={6}>
                                                        <ControlLabel>Temp C</ControlLabel>
                                                        <FormControl type="text" placeholder="Deg" value={step.temp} onChange={this.handleMashTempChange(idx)} style={inputStyle} {...keyboardAttribute} />
                                                        <br/>
                                                    </Col>
                                                </Row>
                                                
                                                <ControlLabel>Time</ControlLabel>
                                                <FormControl type="text" placeholder="Min" value={step.time} onChange={this.handleMashHoldChange(idx)} style={inputStyle} {...keyboardAttribute} />
                                                <br/>
                                                <Button onClick={this.removeMashStep(idx)} bsStyle="danger"><Glyphicon glyph="remove-sign" />{' '}Remove</Button>
                                            </FormGroup>
                                        </Panel>
                                    </Col>
                                )
                            }
                        </Row>
                        <Row>
                            <Col xs={6} sm={6} md={3}>
                                <Button onClick={this.addMashStep} bsStyle="success"><Glyphicon glyph="plus-sign" />{' '}Add Step</Button>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel>
                        <Row>
                            <Col xs={12} sm={6} md={3}>
                                <Panel header="Boil">
                                    <FormGroup
                                        controlId="test">
                                        <Row>
                                            <Col xs={6} md={6}>
                                                <ControlLabel>Temp F</ControlLabel>
                                                <FormControl type="text" placeholder="Deg" value={this.state.boil.tempF} onChange={this.handleBoilTempFChange} style={inputStyle} {...keyboardAttribute} />
                                            </Col>
                                            <Col xs={6} md={6}>
                                                <ControlLabel>Temp C</ControlLabel>
                                                <FormControl type="text" placeholder="Deg" value={this.state.boil.temp} onChange={this.handleBoilTempChange} style={inputStyle} {...keyboardAttribute} />
                                            </Col>
                                        </Row>
                                        
                                        <br/>
                                        <ControlLabel>Time</ControlLabel>
                                        <FormControl type="text" placeholder="Min" value={this.state.boil.time} onChange={this.handleBoilTimeChange} style={inputStyle} {...keyboardAttribute} />
                                    </FormGroup>
                                </Panel>
                            </Col>                       
                        </Row>
                    </Panel>  
                    <Row>
                        <Col xs={12}>
                            <Button onClick={this.saveBrewSession(false)} bsSize="large" bsStyle="primary"><Glyphicon glyph="fire" />{' '}Brew</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <br/>
                            <Button onClick={this.saveBrewSession(true)} bsSize="large" bsStyle="primary"><Glyphicon glyph="fire" />{' '}Simulate</Button>
                        </Col>
                    </Row>                    
                </Grid>
            <br/>
            <br/>
            </form>
        </div>

    );
  }
}

export default Session;