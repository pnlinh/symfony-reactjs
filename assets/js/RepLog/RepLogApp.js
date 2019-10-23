import React, {Component} from 'react';
import RepLogs from './RepLogs';

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null
        };

        this.handleRowClick = this.handleRowClick.bind(this);
    }

    handleRowClick(repLogId, event) {
        this.setState({highlightedRowId: repLogId});
    }

    render() {
        const {highlightedRowId} = this.state;
        const {withHeart} = this.props;

        return (
            <RepLogs
                withHeart={withHeart}
                highlightedRowId={highlightedRowId}
                onRowClick={this.handleRowClick}
            />
        )
    }
}
