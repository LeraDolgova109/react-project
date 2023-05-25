import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { setCourseStatusThunkCreator } from '../../reducers/courses-reducer';


function CourseStatusDialog(props) {
    const dispatch = useDispatch();

    const [courseStatus, setStatusState] = useState('');
    let OFADisabled = (props.status === "OpenForAssigning" || props.status === "Started" || props.status === "Finished");
    let startedDisabled = (props.status === "Started" || props.status === "Finished");
    let finishedDisabled = (props.status === "Finished");
    function closeDialog(){
        props.onHide();
    }

    function saveDialog(event){
        event.preventDefault();
        dispatch(setCourseStatusThunkCreator(props.id, courseStatus));
        props.onHide();
    }

    const handleChange = (e) => {
        const { value, checked } = e.target;
         
        if (checked) {
          setStatusState(value);
        }
    }
    return (
        <Modal
            size='lg'
           {...props}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Изменение статуса курса</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div key='inline-radio' className="mb-3">
                            <Form.Check
                                disabled={OFADisabled}
                                inline
                                type='radio'
                                name="group1"
                                id='inline-radio-2'
                                label='Открыт для записи'
                                value='OpenForAssigning'
                                onChange={handleChange}
                            />
                            <Form.Check
                                disabled={startedDisabled}
                                inline
                                type='radio'
                                name="group1"
                                id='inline-radio-1'
                                label='В процессе'
                                value='Started'
                                onChange={handleChange}
                            />
                            <Form.Check
                                disabled={finishedDisabled}
                                inline
                                type='radio'
                                name="group1"
                                id='inline-radio-1'
                                label='Завершен'
                                value='Finished'
                                onChange={handleChange}
                            />
                        </div>
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

export default CourseStatusDialog;