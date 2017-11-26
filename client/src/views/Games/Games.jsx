/**
 * Games.jsx
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

import React, { Component } from 'react';
import GameInfo from './components/GameInfo.jsx';
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
        let gameInfoComp = null;

        if (this.state.game != null) {
            gameInfoComp = (
                <GameInfo
                    gameId={this.state.game.id}
                    date={this.state.game.date}
                    location={this.state.game.location}
                    headOff={this.state.game.headOff}
                    officials={this.state.game.officials}
                    team1={this.state.game.team1Info}
                    team2={this.state.game.team2Info}
                    handleEdit={this.handleEditButton}
                />
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

                {gameInfoComp}
            </div>
        );
    }
}
