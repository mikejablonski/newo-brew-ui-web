import React, { Component } from 'react';
import { Table, Glyphicon, Button, ButtonToolbar } from 'react-bootstrap';
var dateFormat = require('dateformat');

class BrewHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {brewSessions: []};
    }

    componentDidMount() {
        fetch('http://raspberrypi.local:3001/brewSessions')
        .then((response) => {
            return response.json()
        }).then((json) => {
            this.setState({
                brewSessions: json.data
            }); 
        }).catch((ex) => {
            this.setState({
                brewSessions: []
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
    const listItems = this.state.brewSessions
        .sort((a, b) => b.created - a.created)
        .map((item) =>
        <tr key={item.created}>
            <td>{item.$loki}</td>
            <td>{item.name}</td>
            <td>{dateFormat(item.created, "mm-dd-yyyy hh:MM:ss TT")}</td>
            <td>
                {this.mapBrewSessionStatus(item.status)}
                {item.status === 1 &&
                    <div>Step {item.step} of 5</div>
                }
            </td>
            <td>
                    <ButtonToolbar>
                        <Button bsStyle="primary" onClick={this.rerunBrewSession(item.$loki)} ><Glyphicon glyph="grain" /></Button>
                        {item.status === 1 && 
                        <Button bsStyle="success" onClick={this.resumeBrewSession(item.$loki)}><Glyphicon glyph="repeat" /></Button>
                        }
                    </ButtonToolbar>
            </td>
        </tr>
        );      
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
            </Table>
        </div>

    );
  }
}

export default BrewHistory;