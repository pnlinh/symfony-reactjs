import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class RepLogCreatorControlledComponents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantityInputError: '',
        };

        this.quantityInput = React.createRef();
        this.itemSelect = React.createRef();

        this.itemOptions = [
            {id: 'cat', text: 'Cat'},
            {id: 'fat_cat', text: 'Big Fat Cat'},
            {id: 'laptop', text: 'My Laptop'},
            {id: 'coffee_cup', text: 'Coffee Cup'},
        ];

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleSelectedItemChange = this.handleSelectedItemChange.bind(this);
        this.handleQuantityInputChange = this.handleQuantityInputChange.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const {onAddRepLog} = this.props;

        const quantityInput = this.quantityInput.current;
        const itemSelect = this.itemSelect.current;

        if (quantityInput.value <= 0) {
            this.setState({
                quantityInputError: 'Please enter a value greater than 0'
            });

            return;
        }

        onAddRepLog(
            itemSelect.options[itemSelect.selectedIndex].value,
            quantityInput.value
        );

        quantityInput.value = '';
        itemSelect.selectedIndex = 0;

        this.setState({
            quantityInputError: ''
        });
    }

    handleSelectedItemChange(event) {
        this.setState({
            selectedItemId: event.target.value
        });
    }

    handleQuantityInputChange(event) {
        this.setState({
            quantityValue: event.target.value
        });
    }

    render() {
        const {quantityInputError,selectedItemId,quantityValue} = this.state;

        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                    <label className="sr-only control-label required" htmlFor="rep_log_item">
                        What did you lift?
                    </label>

                    <select id="rep_log_item"
                            ref={this.itemSelect}
                            onChange={this.handleSelectedItemChange}
                            required="required"
                            className="form-control">
                        <option value="">What did you lift?</option>
                        {this.itemOptions.map(option => <option value={option.id}
                                                                key={option.id}>{option.text}</option>)}
                    </select>
                </div>
                {' '}
                <div className={`form-group ${quantityInputError ? 'has-error' : ''}`}>
                    <label className="sr-only control-label required" htmlFor="rep_log_reps">
                        How many times?
                    </label>

                    <input type="number" id="rep_log_reps"
                           ref={this.quantityInput}
                           onChange={this.handleQuantityInputChange}
                           placeholder="How many times?"
                           className="form-control"/>

                    {quantityInputError && <span className="help-block">{quantityInputError}</span>}
                </div>
                {' '}
                <button type="submit" className="btn btn-primary">I Lifted it!</button>
            </form>);
    }
}
RepLogCreatorControlledComponents.propTypes = {
    onAddRepLog: PropTypes.func.isRequired
};
