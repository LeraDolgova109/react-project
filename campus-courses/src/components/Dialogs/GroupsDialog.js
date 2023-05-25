import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {useDispatch} from "react-redux";
import {
    createGroupsThunkCreator,
    editGroupsThunkCreator,
    setEditGroupsActionCreator
} from "../../reducers/groups-reducer";

function GroupsDialog(props) {
    const [groupName, setGroupName] = useState(props.name);
    const dispatch = useDispatch();
    const [validateGroup, setValidateGroup] = useState('');
    
    function closeDialog(){
        setGroupName(props.name);
        props.onHide();
    }

    function saveDialog(event){
        event.preventDefault();
        if (groupName.length > 0) {
            if (props.action === 'update') {
                dispatch(setEditGroupsActionCreator(props.id, groupName));
                dispatch(editGroupsThunkCreator(props.id, groupName));
            }
            if (props.action === 'create') {
                dispatch(createGroupsThunkCreator(groupName));
            }
            props.onHide();
            setValidateGroup('');
        }
        else {
            setValidateGroup('Длина названия группы должна быть минимум 1 символ');
        }
    }

    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                {props.action === 'update' &&
                    <Modal.Title>Редактирование группы</Modal.Title>
                }
                {props.action === 'create' &&
                    <Modal.Title>Создание группы</Modal.Title>
                }
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Название группы</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={props.name}
                            value={groupName}
                            onChange={(e) => setGroupName((e.target.value))}
                            autoFocus
                        />
                        <Form.Text className="text-danger">
                            {validateGroup}
                        </Form.Text>
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

export default GroupsDialog;