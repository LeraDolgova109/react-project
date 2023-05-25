import React from "react";
import { connect } from 'react-redux';
import {loadGroupsThunkCreator} from "../../reducers/groups-reducer";
import {loadProfileThunkCreator} from "../../reducers/profile-reducer";
import GroupsContainer from "./GroupsContainer";

class MiddlewareGroupsComponent extends React.Component {
    componentDidMount(){
        this.props.loadGroupsThunkCreator();
        this.props.loadProfileThunkCreator();
    }
    
    render(){
        return (<GroupsContainer {...this.props}/>)
    }
}

function mapStateProps(state){
    return {
        profile : state.profile,
        groups : state.groups
    };
}
const GroupsComponent = connect(mapStateProps, {loadGroupsThunkCreator, loadProfileThunkCreator})(MiddlewareGroupsComponent);
export default GroupsComponent;