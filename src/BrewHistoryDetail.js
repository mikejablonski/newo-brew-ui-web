import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

class BrewHistoryDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {isBrewSessionLoaded: false};
    }

    componentDidMount() {
        if (this.props.match.params.sessionId) {
            this.setState({id: this.props.match.params.sessionId});
            this.getBrewSession(this.props.match.params.sessionId);
        }
    }

    getBrewSession = (sessionId) => {
        fetch(`http://raspberrypi.local:3001/brewSession/${sessionId}`)
        .then((response) => {
            return response.json()
        }).then((json) => {
            this.setState({
                brewSession: json,
                isBrewSessionLoaded: true
            }); 
        }).catch((ex) => {
            this.setState({
                brewSession: {}
            });
        })      
    }    

    mapBrewSessionStatus(status) {
        switch (status) {
            case 1:
                return 'Stopped';
            case 2:
                return 'Running';
            case 3:
                return 'Completed';
            default:
                return 'Unknown';
        }
    }

    rerunBrewSession = (sessionId) => () => {
        this.props.history.push(`/session/${sessionId}`);
    }

    resumeBrewSession = (sessionId) => () => {
        var postBody = {};
        postBody.sessionId = sessionId;

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
    return (
        <div>
            { this.state.isBrewSessionLoaded && 
                <div>
                <p>{this.state.brewSession.name}</p>
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
                </div>
            }
        </div>

    );
  }
}

export default BrewHistoryDetail;