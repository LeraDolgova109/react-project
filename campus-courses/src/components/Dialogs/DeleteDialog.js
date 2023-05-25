import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useDispatch} from "react-redux";
import {deleteGroupsThunkCreator} from "../../reducers/groups-reducer";

function DeleteDialog(props) {
    const dispatch = useDispatch();
    function closeDialog(){
        props.onHide();
    }

    function saveDialog(){
        dispatch(deleteGroupsThunkCreator(props.id));
    }

    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>Удаление группы</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Подтвердите удаление группы
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeDialog}>
                    Отмена
                </Button>
                <Button variant="danger" onClick={saveDialog}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteDialog;