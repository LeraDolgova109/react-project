import React from "react";
import { connect } from 'react-redux';
import {loadProfileThunkCreator} from "../../reducers/profile-reducer";
import ProfileContainer from "../Profile/ProfileContainer";

class MiddlewareProfileComponent extends React.Component {
    componentDidMount(){
        this.props.loadProfileThunkCreator();
    }
    
    render(){
        return <ProfileContainer {...this.props}/>;
    }
}

function mapStateProps(state){
    return {
        profile : state.profile
    };
}
const ProfileComponent = connect(mapStateProps, {loadProfileThunkCreator})(MiddlewareProfileComponent);
export default ProfileComponent;