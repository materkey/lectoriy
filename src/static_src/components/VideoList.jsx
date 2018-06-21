import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadVideos } from './../actions/videos';
import apiUrls from './../constants/apiUrls';

import Video from './Video';
import Loader from './Loader';


class VideoList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        videoList: PropTypes.arrayOf(PropTypes.number),
        loadVideos: PropTypes.func.isRequired,
    }

    static defaultProps = {
        videoList: [],
        isLoading: false,
    }

    componentDidMount() {
        this.props.loadVideos(apiUrls.video);
    }

    render() {
        if (this.props.isLoading) {
            return <div className="b-video-list">
                <Loader />
            </div>;
        }

        const videos = this.props.videoList.map(
            item => <Video key={ item } id={ item } />,
        );
        return (
            <div className="b-video-list">
                { videos }
            </div>
        );
    }
}


const mapStateToProps = ({ videos }) => {
    return {
        videoList: videos.videoList,
        isLoading: videos.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ loadVideos }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
