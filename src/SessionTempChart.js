import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import 'whatwg-fetch'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

class SessionTempChart extends Component {

  constructor(props) {
    super(props);
    this.state = {isBrewSessionRunning: false};

    this.panelTitle = (
      <h3>Temperature Chart</h3>
    );
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    fetch('http://raspberrypi.local:3001/brew')
      .then((response) => {
        return response.json()
      }).then((json) => {
        this.setState({
          isBrewSessionRunning: json.isBrewSessionRunning
        });
        if (json.isBrewSessionRunning && json.brewSession) {
          this.setState({
            brewSession: json.brewSession
          });
        }
      }).catch((ex) => {
        console.log('Exception!');
        this.setState({
            isBrewSessionRunning: false
        });
      })
  }


  render() {
    return (
        <div>
            {this.state.isBrewSessionRunning && this.state.brewSession && 
                <Panel header={this.panelTitle}>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={this.state.brewSession.mashTempData}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="formattedTime" />
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            <Line type="monotone" dataKey="tempF" stroke="#8884d8" isAnimationActive={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </Panel>
            }
        </div>
    );
  }
}

export default SessionTempChart;