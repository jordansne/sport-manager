/**
 * LeafsInfo.jsx - Leafs Info page main file.
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
            officialOption: 'mostGames',
            officialComp: null
        };

        // Allow for using 'this' in callback
        this.handleOfficialChange = this.handleOfficialChange.bind(this);
    }

    componentDidMount() {
        this.loadOfficial();
    }

    // React dropdown change handler
    handleOfficialChange(event) {
        this.setState({
            officialOption: event.target.value,
            officialComp: this.state.officialComp
        }, () => {
            this.loadOfficial();
        });
    }

    // Retrieve the official information from the server
    loadOfficial() {
        let apiUrl = URL_PREFIX;
        let titleComp = null;

        // Set the corresponding API call for the official
        if (this.state.officialOption === 'mostGames') {
            apiUrl += '/api/leafs/official/mostGames';
            titleComp = <h2>Officiated Most Leafs Games</h2>;

        } else if (this.state.officialOption === 'mostWins') {
            apiUrl += '/api/leafs/official/mostWins';
            titleComp = <h2>Officiated Most Leafs Wins</h2>;

        } else if (this.state.officialOption == 'mostLosses') {
            apiUrl += '/api/leafs/official/mostLosses';
            titleComp = <h2>Officiated Most Leafs Losses</h2>;
        }

        // Make GET request to retrieve the selected official information
        axios.get(apiUrl).then((response) => {
            // Update the UI
            this.setState({
                officialOption: this.state.officialOption,
                officialComp: (
                    <div>
                        {titleComp}
                        <OfficialHeader />
                        <OfficialItem
                            id={response.data.id}
                            lastName={response.data.lastName}
                            firstName={response.data.firstName}
                            home={response.data.home}
                        />
                    </div>
                )
            });
        });
    }

    render() {
        return (
            <div>
                <h1>Leafs Information</h1>

                <h2>Leafs Games</h2>
                <LeafGames />

                <h2>Official Information</h2>
                <form onSubmit={this.handleOfficial}>
                    <select value={this.state.officialOption} onChange={this.handleOfficialChange}>
                        <option value='mostGames'>Most Leaf Games Officiated</option>
                        <option value='mostWins'>Most Leaf Wins Officiated</option>
                        <option value='mostLosses'>Most Leaf Losses Officiated</option>
                    </select>
                </form>

                {this.state.officialComp}
            </div>
        );
    }
}
