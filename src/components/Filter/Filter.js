import React from 'react';
import styles from './Filter.module.css';
import PropTypes from 'prop-types';

function Filter({ value, onChangeFilter }) {
    return (
        <div>
            <h2>Find contacts by name</h2>
            <input
                className={styles.filter} 
                type="text" value={value}
                onChange={e => onChangeFilter(e.target.value)}>
            </input>
        </div>
    )
}

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChangeFilter: PropTypes.func.isRequired    
}

export default Filter;