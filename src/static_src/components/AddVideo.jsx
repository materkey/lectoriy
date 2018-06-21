import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import apiUrls from '../constants/apiUrls';
import { bindActionCreators } from 'redux';
import { createVideo } from '../actions/videos';
import { loadCurrentUser } from '../actions/users';
import PropTypes from 'prop-types';


const styles = theme => ({
    button: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
});

class FormDialog extends React.Component {
        static propTypes = {
            current_user_id: PropTypes.number,
            loadCurrentUser: PropTypes.func,
        };
        static defaultProps = {
            current_user_id: null,
        };
      state = {
          open: false,
          isLoading: false,
          title: 'Новая лекция',
          link: '',

      };

      getCookie(name) {
          if (!document.cookie) {
              return null;
          }

          const xsrfCookies = document.cookie.split(';')
              .map(c => c.trim())
              .filter(c => c.startsWith(`${name}=`));

          if (xsrfCookies.length === 0) {
              return null;
          }

          return decodeURIComponent(xsrfCookies[0].split('=')[1]);
      }

  handleClickOpen = () => {
      this.setState({ open: true });
  };

  handleClose = () => {
      this.setState({ open: false });
  };

  // state = {
  //     project_id: 1,
  //     text: '',
  //     description: '',
  //     status: 1,
  //     isLoading: false,
  // }
  //
  //   onChange = (e) => {
  //       this.setState({ [e.target.name]: e.target.value });
  //   }
    handleTitle = (e) => {
        this.setState({
            title: e.target.value,
        });
    };
    handleLink = (e) => {
        this.setState({
            link: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.isLoading) {
            return;
        }
        if (!this.props.current_user_id || this.props.current_user_id === null) {
            this.props.loadCurrentUser(apiUrls.currentUser);
        }
        this.setState({ isLoading: true });
        const newVideo = {
            title: this.state.title,
            link: this.state.link,
            author: '1',
            video_course: '2',
        };
        const csrfToken = this.getCookie('csrftoken');
        fetch(apiUrls.video, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(newVideo),
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
        }).then((response) => {
            if (response.ok) {
                this.handleClose();
                return response.json();
            }
            throw new Error('Network response was not ok.');
        }).then((json) => {
            this.setState({ isLoading: false });
            return this.props.createVideo(json);
        }).catch((error) => {
            this.setState({ isLoading: false });
            console.log(`There has been a problem with your fetch operation: ${error.message}`);
        });
    };

    render() {
        return (
            <div>
                {/* <Button onClick={ this.handleClickOpen }>Open form dialog</Button> */}
                <Button onClick={ this.handleClickOpen } variant="fab" color="primary" aria-label="add" className={ this.props.classes.button }>
                    <AddIcon />
                </Button>
                <Dialog
                    open={ this.state.open }
                    onClose={ this.handleClose }
                    aria-labelledby="form-dialog-title"
                >

                    <DialogTitle id="form-dialog-title">Создание видео</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Заполните форму создания видео.
                        </DialogContentText>
                        <form id="createVideoForm" onSubmit={ this.handleSubmit }>
                            {/* <DjangoCSRFToken/> */}
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Название видео"
                                type="title"
                                value={ this.state.title }
                                onChange={ this.handleTitle }
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Ссылка на YouTube"
                                type="link"
                                value={ this.state.link }
                                onChange={ this.handleLink }
                                fullWidth
                            />
                            {/* <TextField */}
                            {/* autoFocus */}
                            {/* margin="dense" */}
                            {/* id="name" */}
                            {/* label="Лектор" */}
                            {/* type="email" */}
                            {/* fullWidth */}
                            {/* /> */}
                            {/* <TextField */}
                            {/* autoFocus */}
                            {/* margin="dense" */}
                            {/* id="name" */}
                            {/* label="Категория" */}
                            {/* type="email" */}
                            {/* fullWidth */}
                            {/* /> */}
                        </form>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ this.handleClose } color="primary">
                            Отмена
                        </Button>
                        <Button type="submit" form="createVideoForm" onClick={ this.handleSubmit } color="primary">
                            Создать
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({ createVideo, loadCurrentUser }, dispatch);

const mapStateToProps = ({ users }) => ({
    current_user_id: users.current.id,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormDialog));
