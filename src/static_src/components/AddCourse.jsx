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
import { createCourse } from '../actions/courses';

const styles = theme => ({
    button: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
});

class FormDialog extends React.Component {
      state = {
          open: false,
          isLoading: false,
          status: 1,
          title: 'Новый курс',

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

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.isLoading) {
            return;
        }
        this.setState({ isLoading: true });
        const newCourse = {
            title: this.state.title,
        };
        const csrfToken = this.getCookie('csrftoken');
        fetch(apiUrls.course, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(newCourse),
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
            return this.props.createCourse(json);
        }).catch((error) => {
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

                    <DialogTitle id="form-dialog-title">Создание курса</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Заполните форму создания курса.
                        </DialogContentText>
                        <form id="createCourseForm" onSubmit={ this.handleSubmit }>
                            {/* <DjangoCSRFToken/> */}
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Название курса"
                                type="title"
                                value={ this.state.title }
                                onChange={ this.handleTitle }
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
                        <Button type="submit" form="createCourseForm" onClick={ this.handleSubmit } color="primary">
                            Создать
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({ createCourse }, dispatch);

export default connect(null, mapDispatchToProps)(withStyles(styles)(FormDialog));
