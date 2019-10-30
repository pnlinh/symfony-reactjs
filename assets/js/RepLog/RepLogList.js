import React from 'react';

export default function RepLogList(props) {
    const {highlightedRowId, onRowClick,repLogs} = props;

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
                        <td>...</td>
                    </tr>
                ))
        }
        </tbody>
    );
}
