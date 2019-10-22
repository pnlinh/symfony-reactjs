import React, {Component} from 'react';

export default class RepLogApp extends Component {
    render() {
        let heart = '';

        if (this.props.withHeart) {
            heart = <span>❤️</span>;
        }

        const repLogs = [
            {id: 1, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5},
            {id: 2, reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180},
            {id: 8, reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72}
        ];

        const repLogElements = repLogs.map(repLog => {
            return (
                <tr key={repLog.id}>
                    <td>{repLog.itemLabel}</td>
                    <td>{repLog.reps}</td>
                    <td>{repLog.totalWeightLifted}</td>
                    <td>...</td>
                </tr>
            );
        });

        return (
            <div className="col-md-7">
                <h2>Lift History! {heart} </h2>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>What</th>
                        <th>How many times?</th>
                        <th>Weight</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {repLogElements}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>&nbsp;</td>
                        <th>Total</th>
                        <th>TODO</th>
                        <td>&nbsp;</td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}
