import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

export class App extends React.Component {
    render() {
        return (
            <div className="b-wrapper">
                <Link to="/courses/">Курсы</Link>
                <Link to="/videos/">Видео</Link>
                world
            </div>
        )
    }
}

export default App;