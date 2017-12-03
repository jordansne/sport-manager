/**
 * OfficialList.jsx
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

import React, { Component } from 'react';
import axios from 'axios';
import OfficialHeader from '../../../components/OfficialHeader.jsx';
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
        const officials = [];

        // Make GET request to retrieve official list by last name
        axios.get(URL_PREFIX + '/api/officials').then((response) => {
            for (const official of response.data.officials) {
                officials.push(official);
            }

            this.setState({
                officialList: officials
            });
        });
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
                <OfficialHeader />
                <ul className={styles.list}>
                    {officials}
                </ul>
            </div>
        );
    }
}
