import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
    const {className, ...ortherProps} = props;

    return (
        <button
            className={`btn ${className}`}
            {...ortherProps}
        >
            {props.children}
        </button>
    );
}

Button.propTypes = {
    className: PropTypes.string,
};

Button.defaultProps = {
    className: '',
};
