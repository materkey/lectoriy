// import React from 'react';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import AddIcon from '@material-ui/icons/Add';
// import { connect } from 'react-redux';
// import { withStyles } from '@material-ui/core/styles/index';
// import apiUrls from '../constants/apiUrls';
// import { bindActionCreators } from 'redux';
// import { createVideo } from '../actions/videos';
// import { loadCurrentUser } from '../actions/users';
// import PropTypes from 'prop-types';
// import YouTube from 'react-youtube';
//
//
// const styles = theme => ({
//     button: {
//         position: 'fixed',
//         bottom: theme.spacing.unit * 2,
//         right: theme.spacing.unit * 2,
//     },
// });
//
// class FormDialog extends React.Component {
//       state = {
//           open: false,
//           isLoading: false,
//           title: 'Новая лекция',
//           link: '',
//
//       };
//
//       render() {
//           const opts = {
//               height: '390',
//               width: '640',
//               playerVars: { // https://developers.google.com/youtube/player_parameters
//                   autoplay: 1,
//               },
//           };
//
//           return (
//
//               <div>
//                   {/* <Button onClick={ this.handleClickOpen }>Open form dialog</Button> */}
//                   <Button onClick={ this.handleClickOpen } variant="fab" color="primary" aria-label="add" className={ this.props.classes.button }>
//                       <AddIcon />
//                   </Button>
//                   <Dialog
//                       open={ this.state.open }
//                       onClose={ this.handleClose }
//                       aria-labelledby="form-dialog-title"
//                   >
//
//                       <YouTube
//                           videoId="2g811Eo7K8U"
//                           {/*{this.props.video_id}*/}
//                           opts={ opts }
//                           onReady={ this._onReady }
//                       />
//                   </Dialog>
//               </div>
//           );
//       }
//       _onReady(event) {
//           // access to player in all event handlers via event.target
//           event.target.pauseVideo();
//       }
// }
//
//
// const mapDispatchToProps = dispatch => bindActionCreators({ createVideo, loadCurrentUser }, dispatch);
//
// const mapStateToProps = ({ users }) => ({
//     current_user_id: users.current.id,
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormDialog));
