import React, {useState} from 'react';
import GroupsItem from "./GroupsItem";
import {ListGroup} from "react-bootstrap";
import ToastItem from "../Toast/ToastItem";

class GroupsContainer extends React.Component{
    render(){
        if (this.props.groups.groups === 401) {
            return <ToastItem message="Необходимо авторизоваться" error={401}/>;
        }

        return(
            <ListGroup style={{marginTop: 30 + "px"}}>
                {
                    this.props.groups.groups.map((value) => {
                        return <GroupsItem
                            name={value.name}
                            id={value.id}
                            key={value.id}
                            isAdmin={this.props.profile.user.roles.isAdmin}
                        />
                    })
                }
            </ListGroup>
        );
    }
}

export default GroupsContainer;