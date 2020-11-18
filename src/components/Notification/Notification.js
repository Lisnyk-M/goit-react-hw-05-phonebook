import PropTypes from 'prop-types';
import React from 'react';
import styles from './Notification.module.css';

function Notification({message}) {
    return (
        <h2 className={styles.notification}>{message}</h2>
    )
}

Notification.propTypes = {
    message: PropTypes.string.isRequired
}

export default Notification;
