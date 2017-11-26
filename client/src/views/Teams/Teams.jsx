/**
 * Teams.jsx
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

import React, { Component } from 'react';
import TeamList from './components/TeamList.jsx';
import styles from './Teams.css';

export default class Teams extends Component {
    constructor(props) {
        super(props);

        this.state = {
            createTeam: {
                name: '',
                id: '',
                city: '',
            },
            teamList: []
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    componentDidMount() {
        this.updateTeams();
    }

    handleNameChange(event) {
        const newName = event.target.value.toLowerCase();

        this.setState({
            createTeam: {
                name: newName,
                id: this.state.createTeam.id,
                city: this.state.createTeam.city
            },
            teamList: this.state.teamList
        });
    }

    handleIdChange(event) {
        const newId = event.target.value.toLowerCase();

        this.setState({
            createTeam: {
                name: this.state.createTeam.name,
                id: newId,
                city: this.state.createTeam.city
            },
            teamList: this.state.teamList
        });
    }

    handleCityChange(event) {
        const newCity = event.target.value.toLowerCase();

        this.setState({
            createTeam: {
                name: this.state.createTeam.name,
                id: this.state.createTeam.id,
                city: newCity
            },
            teamList: this.state.teamList
        });
    }

    handleCreate(event) {
        event.preventDefault();

        // TODO Send a POST request to create a new team

        this.updateTeams('name-down');
    }

    updateTeams(sortBy) {
        const teams = [];

        // TODO Send a GET request to retrieve team list

        this.setState({
            createTeam: {
                name: this.state.createTeam.name,
                id: this.state.createTeam.id,
                city: this.state.createTeam.city
            },
            teamList: teams
        });
    }

    render() {
        return (
            <div>
                <h1>Teams</h1>

                <h2>Create Team</h2>
                <form>
                    <label>
                        Name:
                        <input
                            className={styles.nameInput}
                            type='text'
                            value={this.state.createTeam.name}
                            onChange={this.handleNameChange}
                        />
                    </label>
                    <label>
                        ID Number:
                        <input
                            className={styles.idInput}
                            type='text'
                            value={this.state.createTeam.id}
                            onChange={this.handleIdChange}
                        />
                    </label>
                    <label>
                        City:
                        <input
                            className={styles.cityInput}
                            type='text'
                            value={this.state.createTeam.city}
                            onChange={this.handleCityChange}
                        />
                    </label>
                    <input
                        className={styles.createButton}
                        type='submit'
                        value='Create'
                        onClick={this.handleCreate}
                    />
                </form>

                <h2>Team List</h2>
                <div className={styles.sortOptions}>
                    Sort by:
                    <button className={styles.sortButton} onClick={() => this.updateTeams('name-down')}>
                        Name &darr;
                    </button>
                    <button className={styles.sortButton} onClick={() => this.updateTeams('name-up')}>
                        Name &uarr;
                    </button>
                    <button className={styles.sortButton} onClick={() => this.updateTeams('city-down')}>
                        City &darr;
                    </button>
                    <button className={styles.sortButton} onClick={() => this.updateTeams('city-up')}>
                        City &uarr;
                    </button>
                </div>
                <TeamList teamList={this.state.teamList} />
            </div>
        );
    }
}
