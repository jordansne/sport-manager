/**
 * LeafGames.jsx
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

import React, { Component } from 'react';
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
        // TODO Make GET request to find all Leafs games
    }

    render() {
        const gameComps = [];

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
