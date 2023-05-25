import React from 'react';
import GroupItem from "./GroupItem";
import {ListGroup} from "react-bootstrap";
import ToastItem from "../Toast/ToastItem";
import CreateGroup from "./CreateGroup";

class GroupContainer extends React.Component {
    render(){
        if (this.props.group.group === 401) {
            return <ToastItem
                message="Необходимо авторизоваться"
                error={401}
            />;
        }
        if (this.props.group.group === 400) {
            return <ToastItem
                message="Произошла ошибка"
                error={400}
            />;
        }
        if (this.props.group.group === 404) {
            return <ToastItem
                message="Неверный id группы"
                error={404}
            />;
        }

        let groups = this.props.groups.groups;
        let group = groups.find(item => item.id === this.props.id);
        let groupName = '';
        if (group) groupName = group.name;
        return(
            <>
            <h1>Группа - {groupName} </h1>
            <CreateGroup {...this.props}/>
            <ListGroup style={{marginTop: 30 + "px"}}>
                { this.props.group.group.map((value) => {
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
            </>
        );
    }
}

export default GroupContainer;