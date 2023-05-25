import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useDispatch} from "react-redux";
import {deleteCourseThunkCreator} from "../../reducers/courses-reducer";

function DeleteCourseDialog(props) {
    const dispatch = useDispatch();
    function closeDialog(){
        props.onHide();
    }

    function saveDialog(){
        dispatch(deleteCourseThunkCreator(props.id));
    }

    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>Удаление курса</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Подтвердите удаление курса
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

export default DeleteCourseDialog;