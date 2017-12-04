/**
 * LeafGames.jsx - Component for displaying a list of leaf games.
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

import React, { Component } from 'react';
import axios from 'axios';
import GameScore from '../../../components/GameScore.jsx';
import styles from './LeafGames.css';

export default class LeafGames extends Component {
    constructor(props) {
        super(props);

        this.state = {
            games: []
        };
    }

    componentDidMount() {
        // Make GET request to retrieve list of leaf games
        axios.get(URL_PREFIX + '/api/leafs/games').then((response) => {
            // Update the UI
            this.setState({
                games: response.data.games
            });
        });
    }

    render() {
        const gameComps = [];

        // Display a GameScore component for each game
        for (let game = 0; game < this.state.games.length; game++) {
            gameComps.push(
                <GameScore team1={this.state.games[game].team1} team2={this.state.games[game].team2} key={game}/>
            );
        }

        return (
            <div>
                {gameComps}
            </div>
        );
    }
}
