import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import Tabs from './Tabs';
import Card from './Card';
import AddButton from './AddButton';
import {Redirect} from "react-router";

export class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Tabs />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={ () => <Redirect to="/courses" /> }
                    />
                    <Route
                        exact
                        path="/courses/"
                        component={ () => <h2>Курсы</h2> }
                    />
                    <Route
                        exact
                        path="/videos/"
                        component={ () => <h2>Видео</h2> }
                    />
                </Switch>

                <Card centered />
                <Card />
                <Card />
                <Card />
                <Card />
                <AddButton />
            </div>
        );
    }
}

export default App;
