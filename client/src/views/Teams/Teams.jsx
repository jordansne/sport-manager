/**
 * Teams.jsx
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

import React, { Component } from 'react';
import axios from 'axios';
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
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.updateTeams();
    }

    handleNameChange(event) {
        const newName = event.target.value;

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
        const newId = event.target.value;

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
        const newCity = event.target.value;

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

        axios.post(URL_PREFIX + '/api/teams', this.state.createTeam).then((response) => {
            alert('New team created.');
            // Update the team list
            this.updateTeams('name-down');
            // Clear the create team form
            this.setState({
                createTeam: {
                    name: '',
                    id: '',
                    city: '',
                },
                teamList: this.state.teamList
            });

        }).catch((error) => {
            if (error.response.status === 403) {
                alert('Team values must not be blank!');
            } else if (error.response.status === 409) {
                alert('A team with that ID already exists! Try with a different ID.');
            }
        });
    }

    handleDelete(id) {
        event.preventDefault();

        axios.post(URL_PREFIX + '/api/teams/' + id + '/delete').then((response) => {
            alert('Team deleted.');
            // Update the team list
            this.updateTeams('name-down');
        });
    }

    updateTeams(sortBy) {
        const teams = [];
        let requestURL = URL_PREFIX + '/api/teams';

        if (sortBy === 'name-asc') {
            requestURL += '?sort[type]=name&sort[dir]=asc';
        } else if (sortBy === 'name-dsc') {
            requestURL += '?sort[type]=name&sort[dir]=dsc';
        } else if (sortBy === 'city-asc') {
            requestURL += '?sort[type]=city&sort[dir]=asc';
        } else if (sortBy === 'city-dsc') {
            requestURL += '?sort[type]=city&sort[dir]=dsc';
        }

        // Make GET request to retrieve team list
        axios.get(requestURL).then((response) => {
            for (const team of response.data.teams) {
                teams.push(team);
            }

            this.setState({
                createTeam: {
                    name: this.state.createTeam.name,
                    id: this.state.createTeam.id,
                    city: this.state.createTeam.city
                },
                teamList: teams
            });
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
                    <button className={styles.sortButton} onClick={() => this.updateTeams('name-asc')}>
                        Name &darr;
                    </button>
                    <button className={styles.sortButton} onClick={() => this.updateTeams('name-dsc')}>
                        Name &uarr;
                    </button>
                    <button className={styles.sortButton} onClick={() => this.updateTeams('city-asc')}>
                        City &darr;
                    </button>
                    <button className={styles.sortButton} onClick={() => this.updateTeams('city-dsc')}>
                        City &uarr;
                    </button>
                </div>
                <TeamList teamList={this.state.teamList} deleteTeam={this.handleDelete} />
            </div>
        );
    }
}
