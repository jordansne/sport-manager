/**
 * GameScore.jsx
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

import React, { Component } from 'react';
import styles from './GameScore.css';

export default class GameScore extends Component {
    render() {
        let winner = 'none';

        if (this.props.team1.score > this.props.team2.score) {
            winner = '1';
        } else if (this.props.team2.score > this.props.team1.score) {
            winner = '2';
        }

        return (
            <div>
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
            </div>
        );
    }
}
