/**
 * OfficialHeader.jsx
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

import React, { Component } from 'react';
import styles from './OfficialHeader.css';

export default class OfficialHeader extends Component {
    render() {
        return (
            <div className={styles.header}>
                <span className={styles.idHeaderAttribute}>ID</span>
                <span className={styles.lastNameHeaderAttribute}>Last Name</span>
                <span className={styles.firstNameHeaderAttribute}>First Name</span>
                <span className={styles.homeHeaderAttribute}>Home City</span>
            </div>
        );
    }
}
