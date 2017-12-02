/**
 * TeamListItem.jsx
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

import React, { Component } from 'react';
import styles from './TeamListItem.css';

export default class TeamListItem extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event) {
        event.preventDefault();
        this.props.deleteTeam(this.props.id);
    }

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
                <button className={styles.deleteButton} onClick={this.handleDelete}>Delete</button>
            </li>
        );
    }
}
