import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadCourses } from './../actions/courses';
import apiUrls from './../constants/apiUrls';

import Course from './Course';
import Loader from './Loader';


class CourseList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        courseList: PropTypes.arrayOf(PropTypes.number),
        loadCourses: PropTypes.func.isRequired,
    }

    static defaultProps = {
        courseList: [],
        isLoading: false,
    }

    componentDidMount() {
        this.props.loadCourses(apiUrls.course);
    }

    render() {
        if (this.props.isLoading) {
            return <div className="b-course-list">
                <Loader />
            </div>;
        }

        const courses = this.props.courseList.slice(0).reverse().map(
            item => <Course key={ item } id={ item } />,
        );
        return (
            <div className="b-course-list">
                { courses }
            </div>
        );
    }
}


const mapStateToProps = ({ courses }) => {
    return {
        courseList: courses.courseList,
        isLoading: courses.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ loadCourses }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
