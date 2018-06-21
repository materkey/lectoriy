import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import Tabs from './Tabs';
import CourseList from './CourseList';
import AddCourse from './AddCourse';
import AddVideo from './AddVideo';
import { Redirect } from 'react-router';
import LoginDialog from './LoginDialog';
import VideoList from "./VideoList";
import YT from "./YT";

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
                        path="/feed/"
                        component={ () => (
                            <div>

                            </div>
                        )
                        }
                    />
                    <Route
                        exact
                        path="/courses/"
                        component={ () => (
                            <div>
                                <CourseList />
                                <AddCourse />

                            </div>
                        )
                        }
                    />
                    <Route
                        exact
                        path="/videos/"
                        component={ () => (
                            <div>
                                <VideoList />
                                <AddVideo />
                            </div>
                        )
                        }
                    />
                    <Route
                        exact
                        path="/collections/"
                    />
                    <Route
                        exact
                        path="/login/"
                        component={ () => <h2>Логин</h2> }

                    />
                </Switch>
            </div>
        );
    }
}

export default App;
