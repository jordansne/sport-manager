/**
 * GameInfo.jsx
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

import React, { Component } from 'react';
import styles from './GameInfo.css';

export default class GameInfo extends Component {
    render() {
        const officials = [];
        let winner = 'none';

        let counter = 0;
        for (const official of this.props.officials) {
            officials.push(
                <span className={styles.official} key={counter}>
                    {official}
                </span>
            );
            counter++;
        }

        if (this.props.team1.score > this.props.team2.score) {
            winner = '1';
        } else if (this.props.team2.score > this.props.team1.score) {
            winner = '2';
        }

        return (
            <div className={styles.gameInfo}>
                <h2>Game Info (ID: {this.props.gameId})</h2>

                <div className={winner === '1' ? styles.winnerBox : styles.teamBox}>
                    <div className={styles.score}>{this.props.team1.score}</div>
                    <div className={styles.teamDetails}>
                        <b>{this.props.team1.name}</b><br />
                        {this.props.team1.city}
                    </div>
                </div>

                <div className={styles.divider}>
                    - vs -
                </div>

                <div className={winner === '2' ? styles.winnerBox : styles.teamBox}>
                    <div className={styles.score}>{this.props.team2.score}</div>
                    <div className={styles.teamDetails}>
                        <b>{this.props.team2.name}</b><br />
                        {this.props.team2.city}
                    </div>
                </div>

                <b>Date:</b> {this.props.date}<br />
                <b>Location:</b> {this.props.location}<br />
                <b>Head Official:</b> {this.props.headOff}<br />
                <b>Officials:</b> {officials}<br />

                <button className={styles.editButton} onClick={this.props.handleEdit}>
                    Edit Location
                </button>
            </div>
        );
    }
}
