/**
 * OfficialList.jsx
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

import React, { Component } from 'react';
import OfficialListItem from '../../../components/OfficialItem.jsx';
import styles from './OfficialList.css';

export default class OfficialList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            officialList: []
        };
    }

    componentDidMount() {
        // TODO Make get request to retrieve officials
    }

    render() {
        const officials = [];

        let counter = 0;
        for (const official of this.state.officialList) {
            officials.push(
                <OfficialListItem
                    id={official.id}
                    lastName={official.lastName}
                    firstName={official.firstName}
                    home={official.home}
                    key={counter}
                />
            );
            counter++;
        }

        return (
            <div>
                <div className={styles.header}>
                    <span className={styles.idHeaderAttribute}>
                        ID
                    </span>
                    <span className={styles.lastNameHeaderAttribute}>
                        Last Name
                    </span>
                    <span className={styles.firstNameHeaderAttribute}>
                        First Name
                    </span>
                    <span className={styles.homeHeaderAttribute}>
                        Home City
                    </span>
                </div>
                <ul className={styles.list}>
                    {officials}
                </ul>
            </div>
        );
    }
}
