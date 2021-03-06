import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import TemperatureProbe from './TemperatureProbe';
import BallValve from './BallValve';
import Relay from './Relay';
import BrewSessionStatusSummary from './BrewSessionStatusSummary';
import SessionTempChart from './SessionTempChart';

class Brew extends Component {  
  render() {
    return (
        <div>
            <Grid>
                <Row>
                    <Col sm={6} md={3}>
                        <BrewSessionStatusSummary />
                    </Col>
                    <Col sm={6} md={3}>
                        <TemperatureProbe />
                    </Col>
                    <Col sm={6} md={3}>
                        <Relay title="Heater" apiUrl="heater" />
                        <Relay title="Pump" apiUrl="pump" />
                    </Col>
                    <Col sm={6} md={3}>
                        <BallValve valve="1" description="Drain Valve" />
                        <BallValve valve="2" description="Fill Valve" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SessionTempChart />
                    </Col>
                </Row>
            </Grid>
        </div>
    );
  }
}

export default Brew;