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
import Lecturer from './Lecturer';
import ShowVideo from './VideoDetails';


const styles = {
    card: {
        maxWidth: 345,
        margin: 'auto',
        marginTop: 25,
    },
    media: {
        height: 0,
        paddingTop: '100%', // 16:9
    },
};

class Video extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        lecturers: PropTypes.arrayOf(PropTypes.number),
    }

    static defaultProps = {
        title: null,
        lecturers: null,
    }

    handleClick = () => {
        {/*<Link video_id={this.props.link}/>*/}
    };

    render() {
        // let lecturers = <Typography>Лектор: Не указан</Typography>
        // console.log(this.props.lecturers);
        // if (this.props.lecturers.length > 0) {
        //     lecturers = this.props.lecturers.map(item => <Lecturer key={item} id={item}/>);
        // }

        return (
            <div>
                <Card className={ this.props.classes.card }>
                    <CardMedia
                        className={ this.props.classes.media }
                        image="/static/video_pic.png"
                        title={ this.props.title }
                    />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {this.props.title}
                        </Typography>
                        <Typography component="p" >
                            {/*{ lecturers }*/}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button href={ this.props.link } onClick={this.handleClick} size="small" color="primary">
                            Просмотр
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

// Video.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

const mapStateToProps = ({ videos }, ownProps) => ({
    ...videos.videos[ownProps.id],
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Video));
