import React from "react";
import { connect } from 'react-redux';
import {loadMyGroupThunkCreator} from "../../../reducers/group-reducer";
import GroupContainer from "./GroupContainer";

class MiddlewareGroupComponent extends React.Component {
    componentDidMount(){
        this.props.loadMyGroupThunkCreator();
    }
    
    render(){
        return (<GroupContainer {...this.props}/>)
    }
}

function mapStateProps(state){
    return {
        group : state.group
    };
}
const GroupComponent = connect(mapStateProps, {loadMyGroupThunkCreator})(MiddlewareGroupComponent);
export default GroupComponent;