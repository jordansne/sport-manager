/**
 * TeamListItem.jsx
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

import React, { Component } from 'react';
import styles from './TeamListItem.css';

export default class TeamListItem extends Component {
    render() {
        return (
            <li className={styles.item}>
                <span className={styles.idAttribute}>
                    {this.props.id}
                </span>
                <span className={styles.nameAttribute}>
                    {this.props.name}
                </span>
                <span className={styles.cityAttribute}>
                    {this.props.city}
                </span>
                <button className={styles.deleteButton}>Delete</button>
            </li>
        );
    }
}
