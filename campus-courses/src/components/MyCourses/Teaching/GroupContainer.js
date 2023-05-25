import React from 'react';
import GroupItem from "../../Group/GroupItem";
import {ListGroup} from "react-bootstrap";
import ToastItem from "../../Toast/ToastItem";

class GroupContainer extends React.Component {
    render(){
        if (this.props.group.teachingCourses === 401) {
            return <ToastItem message="Необходимо авторизоваться" error={401}/>;
        }

        return(
            <ListGroup style={{marginTop: 30 + "px"}}>
                {
                    this.props.group.teachingCourses.map((value) => {
                        return <GroupItem
                            name={value.name}
                            id={value.id}
                            startYear={value.startYear}
                            maximumStudentsCount={value.maximumStudentsCount}
                            remainingSlotsCount={value.remainingSlotsCount}
                            status={value.status}
                            semester={value.semester}
                            key={value.id}
                        />
                    })
                }
            </ListGroup>
        );
    }
}

export default GroupContainer;