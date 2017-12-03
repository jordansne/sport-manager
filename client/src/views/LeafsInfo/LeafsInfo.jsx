/**
 * LeafsInfo.jsx
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

import React, { Component } from 'react';
import axios from 'axios';
import LeafGames from './components/LeafGames.jsx';
import OfficialHeader from '../../components/OfficialHeader.jsx';
import OfficialItem from '../../components/OfficialItem.jsx';
import styles from './LeafsInfo.css';

export default class LeafsInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mostOfficiated: null,
            mostWins: null,
            mostLosses: null
        };
    }

    componentDidMount() {
        // Make GET request to retrieve the official who officiated the most leaf games
        axios.get(URL_PREFIX + '/api/leafs/official/mostGames').then((response) => {
            this.setState({
                mostOfficiated: response.data,
                mostWins: this.state.mostWins,
                mostLosses: this.state.mostLosses
            });
        });

        // TODO Make GET request to the official who officiated the most losses

        // TODO Make GET request to find the official who officiated the most wins
    }

    render() {
        let mostOfficiatedComp = <p>Loading..</p>;
        let mostWinsComp = <p>Loading..</p>;
        let mostLossesComp = <p>Loading..</p>;

        if (this.state.mostOfficiated !== null) {
            mostOfficiatedComp = (
                <OfficialItem
                    id={this.state.mostOfficiated.id}
                    lastName={this.state.mostOfficiated.lastName}
                    firstName={this.state.mostOfficiated.firstName}
                    home={this.state.mostOfficiated.home}
                />
            );
        }

        if (this.state.mostWins !== null) {
            mostWinsComp = (
                <OfficialItem
                    id={this.state.mostWins.id}
                    lastName={this.state.mostWins.lastName}
                    firstName={this.state.mostWins.firstName}
                    home={this.state.mostWins.home}
                />
            );
        }

        if (this.state.mostLosses !== null) {
            mostLossesComp = (
                <OfficialItem
                    id={this.state.mostLosses.id}
                    lastName={this.state.mostLosses.lastName}
                    firstName={this.state.mostLosses.firstName}
                    home={this.state.mostLosses.home}
                />
            );
        }

        return (
            <div>
                <h1>Leafs Information</h1>

                <h2>Maple Leafs Games</h2>
                <LeafGames />

                <h2>Officiated Most Maple Leafs Games</h2>
                <OfficialHeader />
                {mostOfficiatedComp}

                <h2>Officiated Most Maple Leafs Losses</h2>
                <OfficialHeader />
                {mostLossesComp}

                <h2>Officiated Most Maple Leafs Wins</h2>
                <OfficialHeader />
                {mostWinsComp}
            </div>
        );
    }
}
