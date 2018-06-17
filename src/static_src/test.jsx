import React from 'react';
import ReactDOM from 'react-dom';

const divClass = 'greeting';
const test = 'text';

const element = React.createElement(
    'div',
    {className: 'greeting'},
    'Hell',
    React.createElement('div', {}, 'test'),
    ' world!',
);


// const element1 = <div className={ divClass }>Hello <div>{ test }</div> !</div>;

// function HelloWorld(props) {
//     return <div className={ props.divClass }>Hello <div>{ props.test }</div> { props.children } !</div>
// }

class HelloWorld extends React.Component {
    render() {
        return <div className={this.props.divClass}>Hello <div>{this.props.test}</div> {this.props.children} !</div>;
    }
}

// const element1 = HelloWorld({divClass: 'greeting', test: 'text'});

// const element1 = <div>Component <HelloWorld divClass= { divClass } test="text" /></div>;

// ReactDOM.render(
//     element1,
//     document.getElementById('world'),
// );

ReactDOM.render(
    <HelloWorld divClass={divClass} test="text">texttext</HelloWorld>,
    document.getElementById('world'),
);

