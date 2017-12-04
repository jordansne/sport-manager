/**
 * TeamList.jsx - Component for displaying a team list.
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

import React, { Component } from 'react';
import TeamListItem from './TeamListItem.jsx';
import styles from './TeamList.css';

export default class TeamList extends Component {
    render() {
        const teams = [];

        // Display a TeamListItem component for each team
        let counter = 0;
        for (const team of this.props.teamList) {
            teams.push(
                <TeamListItem name={team.name} id={team.id} city={team.city} key={counter} deleteTeam={this.props.deleteTeam}/>
            );
            counter++;
        }

        return (
            <div>
                <div className={styles.header}>
                    <span className={styles.idHeaderAttribute}>
                        ID
                    </span>
                    <span className={styles.nameHeaderAttribute}>
                        Team Name
                    </span>
                    <span className={styles.cityHeaderAttribute}>
                        City
                    </span>
                </div>
                <ul className={styles.list}>
                    {teams}
                </ul>
            </div>
        );
    }
}
