import React from "react";
import ProfileForm from "./ProfileForm";
import ToastItem from "../Toast/ToastItem";

class ProfileContainer extends React.Component{
    render(){
        if (this.props.profile.user.info === 401) {
            return <ToastItem 
                message="Необходимо авторизоваться"
                error={401}
             />;
        }
        if (this.props.profile.user.info === 400) {
            return <ToastItem 
                message="Произошла ошибка" 
                error={400}
            />;
        }

        return (
            <div>
                <ProfileForm {...this.props.profile.user.info}/>
            </div>
        )
    }
}

export default ProfileContainer;