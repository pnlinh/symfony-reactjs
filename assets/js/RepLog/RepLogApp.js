import React, {Component} from 'react';
import RepLogs from './RepLogs';
import uuid from 'uuid/v4';

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            repLogs: [
                {id: uuid(), reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5},
                {id: uuid(), reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180},
                {id: uuid(), reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72}
            ]
        };

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleNewItemSubmit = this.handleNewItemSubmit.bind(this);
    }

    handleRowClick(repLogId, event) {
        this.setState({highlightedRowId: repLogId});
    }

    handleNewItemSubmit(itemLabel, reps) {
        const repLogs = this.state.repLogs;
        const newRep = {
            id: uuid(),
            reps,
            itemLabel,
            totalWeightLifted: Math.floor(Math.random() * 50)
        };

        repLogs.push(newRep);
        this.setState({repLogs});
    }

    render() {
        return (
            <RepLogs
                {...this.props}
                {...this.state}
                onRowClick={this.handleRowClick}
                onNewItemSubmit={this.handleNewItemSubmit}
            />
        )
    }
}
