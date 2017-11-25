/**
 * App.jsx
 * Jordan Mathewson - 250868197
 * CS3319A - Assignment #3
 */

import React, { Component } from 'react';
import Teams from './views/Teams/Teams.jsx';
import Games from './views/Games/Games.jsx';
import Officials from './views/Officials/Officials.jsx';
import LeafsInfo from './views/LeafsInfo/LeafsInfo.jsx';
import NotFound from './views/NotFound.jsx';
import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: <Teams />
        };
    }

    openPage(page) {
        let newPage;

        switch (page) {
            case 'teams':
                newPage = <Teams />
                break;
            case 'games':
                newPage = <Games />
                break;
            case 'officials':
                newPage = <Officials />
                break;
            case 'leafsInfo':
                newPage = <LeafsInfo />
                break;
            default:
                newPage = <NotFound />
        }

        this.setState({
            page: newPage
        });
    }

    render() {
        return (
            <div>
                <header>
                    <h1>NHL Manager</h1>
                </header>

                <section>
                    <aside>
                        <nav>
                            <a onClick={() => this.openPage('teams')}>Teams</a>
                            <a onClick={() => this.openPage('games')}>Games</a>
                            <a onClick={() => this.openPage('officials')}>Officials</a>
                            <a onClick={() => this.openPage('leafsInfo')}>Leafs Info</a>
                        </nav>
                    </aside>

                    <article>
                        {this.state.page}
                    </article>
                </section>
            </div>
        );
    }
}
