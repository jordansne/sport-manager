/**
 * OfficialListItem.jsx
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

import React, { Component } from 'react';
import styles from './OfficialListItem.css';

export default class OfficialListItem extends Component {
    render() {
        return (
            <li className={styles.item}>
                <span className={styles.idAttribute}>
                    {this.props.id}
                </span>
                <span className={styles.lastNameAttribute}>
                    {this.props.lastName}
                </span>
                <span className={styles.firstNameAttribute}>
                    {this.props.firstName}
                </span>
                <span className={styles.homeAttribute}>
                    {this.props.home}
                </span>
            </li>
        );
    }
}
