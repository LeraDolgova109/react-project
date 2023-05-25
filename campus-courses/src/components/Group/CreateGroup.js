import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import GroupDialog from "../Dialogs/GroupDioalog";

function CreateGroup(props) {
    const [modalShow, setModalShow] = useState(false);

    return(
        <>
        { props.profile.user.roles.isAdmin === true &&
        <Button varian='primary' onClick={() => setModalShow(true)}>Создать курс</Button>
        }
        <GroupDialog
            show={modalShow}
            onHide={() => setModalShow(false)}
            users={props.profile.users}
            groupid={props.id}/>
        </>)
}

export default CreateGroup;