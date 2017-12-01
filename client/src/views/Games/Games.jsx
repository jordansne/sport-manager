/**
 * Games.jsx
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

import React, { Component } from 'react';
import GameScore from '../../components/GameScore.jsx';
import styles from './Games.css';

export default class Games extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idInput: '',
            game: null
        };

        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleViewButton = this.handleViewButton.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
    }

    handleIdChange(event) {
        this.setState({
            idInput: event.target.value,
            game: this.state.game
        });
    }


    handleViewButton(event) {
        event.preventDefault();
        this.showGame();
    }

    handleEditButton(event) {
        event.preventDefault();

        let newCity = prompt('Edit the location for game #' + this.state.game.id, this.state.game.location);

        if (newCity !== null && newCity !== '' && newCity !== this.state.game.location) {
            // TODO Send post request to update location of game
            this.showGame();
        }
    }

    showGame() {
        // TODO Send get request for the given game id
    }

    render() {
        let game;

        if (this.state.game != null) {
            const officials = [];

            let counter = 0;
            for (const official of this.state.game.officials) {
                officials.push(
                    <span className={styles.official} key={counter}>
                        {official}
                    </span>
                );
                counter++;
            }

            game = (
                <div className={styles.gameInfo}>
                    <h2>Game Info (ID: {this.state.game.id})</h2>

                    <GameScore team1={this.state.game.team1} team2={this.state.game.team2} />

                    <b>Date:</b> {this.state.game.date}<br />
                    <b>Location:</b> {this.state.game.location}<br />
                    <b>Head Official:</b> {this.state.game.headOff}<br />
                    <b>Officials:</b> {officials}<br />

                    <button className={styles.editButton} onClick={this.handleEditButton}>
                        Edit Location
                    </button>
                </div>
            );
        }

        return (
            <div>
                <h1>Games</h1>
                <h2>View Game</h2>
                <form>
                    <label>
                        Enter ID:
                        <input
                            className={styles.idInput}
                            type='text'
                            value={this.state.idInput}
                            onChange={this.handleIdChange}
                        />
                    </label>
                    <input
                        className={styles.viewButton}
                        type='submit'
                        value='View'
                        onClick={this.handleViewButton}
                    />
                </form>

                {game}
            </div>
        );
    }
}
