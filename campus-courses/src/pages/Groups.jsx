import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Container, Button} from "react-bootstrap";
import GroupsComponent from "../components/Groups/GroupsComponent";
import GroupsDialog from "../components/Dialogs/GroupsDialog";
import '../App.css';

function Groups() {
    const isAdmin = useSelector((state) => state.profile.user.roles.isAdmin);
    const multipleProps = {
        id: '',
        name: '',
        action: "create"
    };

    const [modalShow, setModalShow] = useState(false);

    return (
        <Container className="block">
            <h1>Группы кампусных курсов</h1>
            {isAdmin === true &&
                <Button onClick={() => setModalShow(true)}>Создать</Button>
            }
            <GroupsComponent/>
            <GroupsDialog
                show={modalShow}
                onHide={() => setModalShow(false)}
                {...multipleProps}/>
        </Container>
    )
}

export {Groups}