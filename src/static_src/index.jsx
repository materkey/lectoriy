import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

class HelloWorld extends React.Component {
    render() {
        return <div className={this.props.divClass}>Hello <div>{this.props.test}</div> {this.props.children} !</div>;
    }
}

// ReactDOM.render(
//     <App />,
//     document.getElementById('root'),
// );

ReactDOM.render(
    <HelloWorld divClass="testClass" test="text">texttext</HelloWorld>,
    document.getElementById('root'),
);
