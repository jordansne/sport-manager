/**
 * Games.jsx - Games page main file.
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

import React, { Component } from 'react';
import axios from 'axios';
import GameScore from '../../components/GameScore.jsx';
import styles from './Games.css';

export default class Games extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idInput: '',
            game: null
        };

        // Allow for using 'this' in callbacks
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleViewButton = this.handleViewButton.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
    }

    // React input change handler
    handleIdChange(event) {
        this.setState({
            idInput: event.target.value,
            game: this.state.game
        });
    }

    // Show the game when the view button is pressed
    handleViewButton(event) {
        event.preventDefault();
        this.showGame(this.state.idInput);
    }

    // React edit button handler
    handleEditButton(event) {
        event.preventDefault();

        // Prompt the user for the new location
        let newCity = prompt('Edit the location for game #' + this.state.game.id, this.state.game.location);

        // Verify it's not empty/unspecified and its not the same as the existing location
        if (newCity === '') {
            alert('Location can\'t be empty!');

        } else if (newCity !== null && newCity !== this.state.game.location) {
            // Send a POST request to the server to update the city
            axios.post(URL_PREFIX + '/api/games/' + this.state.game.id, {
                location: newCity
            }).then((response) => {
                alert('Location of game updated.');
                // Update UI with the new data
                this.showGame(this.state.game.id);
            });
        }
    }

    showGame(id) {
        // Ensure the id isn't blank
        if (id === '') {
            alert('Please specify a game ID to lookup');
            return;
        }

        // Make GET request to retrieve game information
        axios.get(URL_PREFIX + '/api/games/' + id).then((response) => {
            // Update the UI
            this.setState({
                idInput: '',
                game: response.data
            });
        }).catch((error) => {
            if (error.response.status === 404) {
                alert('Could not find game that ID!');
            }
        });
    }

    render() {
        let game;

        if (this.state.game != null) {
            const officials = [];

            // Display a span element for each official
            let counter = 0;
            for (const official of this.state.game.officials) {
                officials.push(
                    <span className={styles.official} key={counter}>
                        {official}
                    </span>
                );
                counter++;
            }

            // Display the game infor
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
