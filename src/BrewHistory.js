import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
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

  render() {
    const listItems = this.state.brewSessions
        .sort((a, b) => b.created - a.created)
        .map((item) =>
        <tr key={item.created}>
            <td>{item.$loki}</td>
            <td>{item.name}</td>
            <td>{dateFormat(item.created, "mm-dd-yyyy hh:MM:ss TT")}</td>
            <td>{this.mapBrewSessionStatus(item.status)}</td>
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