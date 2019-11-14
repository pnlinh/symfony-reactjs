import React, {Component} from 'react';
import RepLogs from './RepLogs';
import {getRepLogs, deleteRepLog, createRepLog} from '../api/rep_log_api';

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            repLogs: [],
            numberOfHearts: 1,
            isLoaded: false,
            isSavingNewRepLog: false,
            successMessage: '',
            newRepLogValidationErrorMessage: ''
        };

        this.successMessageTimeoutHandle = 0;

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this);
        this.setSuccessMessage = this.setSuccessMessage.bind(this);
    }

    componentWillUnmount() {
        clearTimeout(this.successMessageTimeoutHandle);
    }

    componentDidMount() {
        getRepLogs()
            .then(data => {
                this.setState({
                    repLogs: data,
                    isLoaded: true
                });
            });
    }

    handleRowClick(repLogId, event) {
        this.setState({highlightedRowId: repLogId});
    }

    handleAddRepLog(item, reps) {
        const newRep = {
            reps,
            item,
        };

        this.setState({
            isSavingNewRepLog: true
        });

        createRepLog(newRep)
            .then(repLog => {
                this.setState(prevState => {
                    const newRepLogs = [...prevState.repLogs, repLog];

                    return {
                        repLogs: newRepLogs,
                        isSavingNewRepLog: false,
                        newRepLogValidationErrorMessage: '',
                    };
                });

                this.setSuccessMessage('Rep Log Saved!');
            })
            .catch(err => {
                return err.response.json().then(errsData => {
                    const errors = errsData.errors;
                    const firstError = errors[Object.keys(errors)[0]];

                    this.setState({
                        newRepLogValidationErrorMessage: firstError
                    });
                });
            });
    }

    handleHeartChange(heartCount) {
        this.setState({
            numberOfHearts: heartCount
        });
    }

    handleDeleteRepLog(id) {
        this.setState(prevState => {
            return {
                repLogs: prevState.repLogs.map(repLog => {
                    if (repLog.id !== id) {
                        return repLog;
                    }

                    return Object.assign({}, repLog, {isDeleting: true});
                })
            }
        });

        deleteRepLog(id)
            .then(() => {
                this.setState((prevState) => {
                    return {
                        repLogs: prevState.repLogs.filter(repLog => repLog.id !== id)
                    };
                });

                this.setSuccessMessage('Item was removed');
            });
    }

    setSuccessMessage(message) {
        this.setState({
            successMessage: message
        });

        clearTimeout(this.successMessageTimeoutHandle);

        this.successMessageTimeoutHandle = setTimeout(() => {
            this.setState({
                successMessage: ''
            });

            this.successMessageTimeoutHandle = 0;
        }, 3000);
    }

    render() {
        return (
            <RepLogs
                {...this.props}
                {...this.state}
                onRowClick={this.handleRowClick}
                onAddRepLog={this.handleAddRepLog}
                onHeartChange={this.handleHeartChange}
                onDeleteRepLog={this.handleDeleteRepLog}
            />
        )
    }
}
