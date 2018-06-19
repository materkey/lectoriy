import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { bindActionCreators } from 'redux';
import { changeRoute } from './../actions/routes';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

const styles = {
    root: {
        flexGrow: 1,
    },
};

class CenteredTabs extends React.Component {
    handleChange = (event, value) => {
        this.props.changeRoute(value);
    };

    render() {
        const { classes } = this.props;

        return (
            <Paper className={ classes.root }>
                <Route render={ ({ history }) => (
                    <Tabs
                        value={ this.props.value }
                        onChange={ this.handleChange }
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab
                            label="Лента"
                            onClick={ () => {
                                this.props.changeRoute(0);
                                history.push('/feed/');
                            } }
                        />
                        <Tab
                            label="Курсы"
                            onClick={ () => {
                                this.props.changeRoute(1);
                                history.push('/courses/');
                            } }
                        />
                        <Tab
                            label="Видео"
                            onClick={ () => {
                                this.props.changeRoute(2);
                                history.push('/videos/');
                            } }
                        />
                        <Tab
                            label="Коллекции"
                            onClick={ () => {
                                this.props.changeRoute(3);
                                history.push('/collections/');
                            } }
                        />
                    </Tabs>
                ) }
                />
            </Paper>
        );
    }
}

CenteredTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
};

const mapStateToProps = ({ tabs }) => ({
    value: tabs.value,
});

const mapDispatchToProps = dispatch => bindActionCreators({ changeRoute }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CenteredTabs));
