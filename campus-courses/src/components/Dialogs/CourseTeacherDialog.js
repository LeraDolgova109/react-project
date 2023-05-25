import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import UserSelect from "./Select/UserSelect";
import { setTeacherThunkCreator } from '../../reducers/courses-reducer';


function CourseTeacherDialog(props) {
    const dispatch = useDispatch();

    const users = props.users;
    const [selectedUser, setSelectedUse] = useState('');

    function closeDialog(){
        props.onHide();
    }

    function saveDialog(event){
        event.preventDefault();
        dispatch(setTeacherThunkCreator(props.id, selectedUser));
        props.onHide();
    }

    return (
        <Modal
            size='lg'
           {...props}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Добавление преподавателя на курс</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Выберите преподавателя</Form.Label>
                        <UserSelect
                            value={selectedUser}
                            onChange={user => setSelectedUse(user)}
                            defaultValue='Список пользователей'
                            options={users}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeDialog}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={saveDialog}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CourseTeacherDialog;