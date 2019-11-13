import React from 'react';
import PropTypes from 'prop-types';

export default function RepLogList(props) {
    const {highlightedRowId, onRowClick,repLogs,onDeleteRepLog,isLoaded} = props;

    const handleDeleteClick =  function (event, repLogId) {
        event.preventDefault();

        onDeleteRepLog(repLogId);
    };

    if (!isLoaded) {
        return (
            <tbody>
                <tr>
                    <td colSpan="4" className="text-center">Loading...</td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody>
        {
            repLogs.map(repLog =>
                (
                    <tr key={repLog.id}
                        className={highlightedRowId === repLog.id ? 'info' : ''}
                        onClick={() => onRowClick(repLog.id)}
                    >
                        <td>{repLog.itemLabel}</td>
                        <td>{repLog.reps}</td>
                        <td>{repLog.totalWeightLifted}</td>
                        <td>
                            <a href="#" onClick={(event) => handleDeleteClick(event, repLog.id)}>
                                <span className="fa fa-trash"></span>
                            </a>
                        </td>
                    </tr>
                ))
        }
        </tbody>
    );
}

RepLogList.propTypes = {
    isLoaded: PropTypes.bool.isRequired,
};
