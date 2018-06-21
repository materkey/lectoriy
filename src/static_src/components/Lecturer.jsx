import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

class Lecturer extends React.Component {
        static propTypes = {
            id: PropTypes.number.isRequired,
            name: PropTypes.string,
        }

        static defaultProps = {
            name: null,
        }

        render() {
            return (
                <span>
                    Лектор: { this.props.name }
                </span>
            );
        }
}

const mapStateToProps = ({ lecturers }, ownProps) => ({
    ...lecturers.lecturers[ownProps.id],
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Lecturer);
