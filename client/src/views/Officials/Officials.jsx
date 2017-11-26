/**
 * Officials.jsx
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

import React, { Component } from 'react';
import OfficialList from './components/OfficialList.jsx';
import styles from './Officials.css';

export default class Officials extends Component {
    render() {
        return (
            <div>
                <h1>Officials</h1>

                <h2>Officials List</h2>
                <OfficialList />
            </div>
        );
    }
}
