import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import TemperatureProbe from './TemperatureProbe';
import BallValve from './BallValve';
import Relay from './Relay';

class Brew extends Component {  
  render() {
    return (
        <div>
            <Grid>
                <Row>
                    <Col sm={6} md={3}>
                        <Relay title="Heater" apiUrl="heater" />
                        <Relay title="Pump" apiUrl="pump" />
                    </Col>
                    <Col sm={6} md={3}>
                        <BallValve valve="1" description="Drain Valve" />
                    </Col>
                    <Col sm={6} md={3}>
                        <BallValve valve="2" description="Fill Valve" />
                    </Col>
                    <Col sm={6} md={3}>
                        <TemperatureProbe />
                    </Col>
                </Row>
            </Grid>
        </div>
    );
  }
}

export default Brew;