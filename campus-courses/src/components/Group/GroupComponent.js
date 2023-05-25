import React from "react";
import { connect } from 'react-redux';
import {loadGroupThunkCreator} from "../../reducers/group-reducer";
import {loadGroupsThunkCreator} from "../../reducers/groups-reducer";
import {loadProfileThunkCreator, loadUsersThunkCreator} from "../../reducers/profile-reducer";
import GroupContainer from "./GroupContainer";

class MiddlewareGroupComponent extends React.Component {
    componentDidMount(){
        this.props.loadGroupsThunkCreator();
        this.props.loadGroupThunkCreator(this.props.id);
        this.props.loadProfileThunkCreator();
        this.props.loadUsersThunkCreator();
    }
    render(){
        return (<GroupContainer {...this.props}/>)
    }
}

function mapStateProps(state){
    return {
        groups : state.groups,
        group : state.group,
        profile : state.profile
    };
}
const GroupComponent = connect(mapStateProps, {loadGroupsThunkCreator, loadGroupThunkCreator, loadProfileThunkCreator, loadUsersThunkCreator})(MiddlewareGroupComponent);
export default GroupComponent;