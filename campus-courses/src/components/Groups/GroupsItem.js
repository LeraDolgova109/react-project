import React, {useState} from 'react'
import {Button, Col, ListGroup, Row} from "react-bootstrap";
import '../../App.css';
import GroupsDialog from "../Dialogs/GroupsDialog";
import DeleteDialog from "../Dialogs/DeleteDialog";

function GroupsItem(props){
    const multipleProps = {
        id: props.id,
        name: props.name,
        action: "update"
    };

    const [modalGroupShow, setModalGroupShow] = useState(false);
    const [modalDeleteShow, setModalDeleteShow] = useState(false);

    return (
        <>
            <ListGroup.Item className="fs-5 item">
                <Row>
                    <Col>
                        <span onClick={() => {
                            window.location.pathname = ('groups/' + props.id)
                        }}>
                            {props.name}
                        </span>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        {props.isAdmin === true &&
                            <>
                                <Button variant="warning"
                                        onClick={() => setModalGroupShow(true)}>
                                    Редактировать
                                </Button>
                                <Button variant="danger"
                                        style={{marginLeft: 3 + 'px'}}
                                        onClick={() => setModalDeleteShow(true)}>
                                    Удалить
                                </Button>
                            </>
                        }
                    </Col>
                </Row>
            </ListGroup.Item>
            <GroupsDialog
                show={modalGroupShow}
                onHide={() => setModalGroupShow(false)}
                {...multipleProps}/>
            <DeleteDialog
                show={modalDeleteShow}
                onHide={() => setModalDeleteShow(false)}
                {...multipleProps}/>
        </>
    )
}

export default GroupsItem;