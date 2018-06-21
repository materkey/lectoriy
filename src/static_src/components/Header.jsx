import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Logo from '@material-ui/icons/VideoLibrary';


const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
    },
};

class Header extends React.Component {
    render() {
        return (
            <div className={ this.props.classes.root }>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={ this.props.classes.menuButton } color="inherit" aria-label="Menu">
                            <Logo />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={ this.props.classes.flex }>
                            Лекторий
                        </Typography>
                        <Button
                            href="/social/login/vk-oauth2/"
                            color="inherit"
                        >Войти
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
    };
}
export default withStyles(styles)(Header);
