import React from "react";
import { connect } from 'react-redux';
import {loadCoursesThunkCreator} from "../../reducers/courses-reducer";
import {loadProfileThunkCreator, loadUsersThunkCreator} from "../../reducers/profile-reducer";
import CourseContainer from "./CourseContainer";
import {loadMyGroupThunkCreator} from "../../reducers/group-reducer";

class MiddlewareCoursesComponent extends React.Component {
    componentDidMount(){
        this.props.loadCoursesThunkCreator(this.props.id);
        this.props.loadProfileThunkCreator();
        this.props.loadUsersThunkCreator();
        this.props.loadMyGroupThunkCreator();
    }

    render(){
        return (<CourseContainer {...this.props}/>)
    }
}

function mapStateProps(state){
    return {
        courses : state.courses,
        profile : state.profile,
        group : state.group
    };
}
const CourseComponent = connect(mapStateProps, {loadCoursesThunkCreator, loadProfileThunkCreator,  loadUsersThunkCreator, loadMyGroupThunkCreator})(MiddlewareCoursesComponent);
export default CourseComponent;