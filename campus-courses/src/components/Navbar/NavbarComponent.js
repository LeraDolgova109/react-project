import React from "react";
import { connect } from 'react-redux';
import {loadProfileThunkCreator} from "../../reducers/profile-reducer";
import NavbarCustom from "./NavbarCustom";

class MiddlewareProfileComponent extends React.Component {
    componentDidMount(){
        this.props.loadProfileThunkCreator();
    }
    
    render(){
        return <NavbarCustom {...this.props}/>;
    }
}

function mapStateProps(state){
    return {
        profile : state.profile
    };
}
const ProfileComponent = connect(mapStateProps, {loadProfileThunkCreator})(MiddlewareProfileComponent);
export default ProfileComponent;