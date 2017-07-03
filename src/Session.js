import React, { Component } from 'react';
import { Panel, Grid, Row, Col, Jumbotron, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Glyphicon } from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

function MashGroup({id, header, footer}) {
    return (
        <Panel header={header} footer={footer}>
        <FormGroup
            controlId={id}>
            <ControlLabel>Mash Temp</ControlLabel>
            <FormControl type="text" placeholder="Deg" />
            <ControlLabel>Mash Time</ControlLabel>
            <FormControl type="text" placeholder="Min" />
        </FormGroup>
        </Panel>
    )
}

class Session extends Component { 

  constructor(props) {
    super(props);

    this.panelHeader = (
        <div>
            <Row>
                <Col xs={6}>
                    Hello
                </Col>
                <Col xs={6}>
                    Remove
                </Col>
            </Row>
        </div>
    );
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
                    <Row>
                        <Col xs={6} sm={6} md={3}>
                            <MashGroup header="Mash Step 1" />
                        </Col>
                        <Col xs={6} sm={6} md={3}>
                            <MashGroup header="Mash Step 2"/>
                        </Col>
                        <Col xs={6} sm={6} md={3}>
                            <MashGroup header="Mash Step 3"/>
                        </Col>  
                        <Col xs={6} sm={6} md={3}>
                            <MashGroup header="Mash Step 4"/>
                        </Col>                          
                    </Row>
                    <Row>
                        <Col xs={6} sm={6} md={3}>
                            <Button><Glyphicon glyph="plus" />Add Step</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} sm={6} md={3}>
                            <MashGroup header="Boil" />
                            <Panel header={this.panelHeader}><p>test</p></Panel>
                        </Col>                       
                    </Row>                    
                </Grid>


            </form>
        </div>

    );
  }
}

export default Session;