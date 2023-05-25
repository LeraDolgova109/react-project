import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {setNotificationThunkCreator} from "../../reducers/courses-reducer";


function CourseNotifDialog(props) {
    const dispatch = useDispatch();
    const [annotText, setAnnotTextState] = useState('');
    const [importantStatus, setImportantStatusState] = useState(false);
    const [validateNotif, setValidateNotif] = useState('');
    const handleChange = (e) => {
        const { checked } = e.target;
        setImportantStatusState(checked);
    }

    function closeDialog(){
        props.onHide();
    }

    function saveDialog(event){
        event.preventDefault();
        if (annotText.length === 0) {
            setValidateNotif('Длина уведомления должна быть минимум 1 символ');
        }
        else {
            dispatch(setNotificationThunkCreator(props.id, annotText, importantStatus));
            setValidateNotif('');
            props.onHide();
        }
    }


    return (
        <Modal
            size='lg'
           {...props}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Создание уведомления</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Увдеомление</Form.Label>
                            <Form.Control
                                as="textarea"
                                style={{ height: '100px' }}
                                value={annotText}
                                onChange={(e) => setAnnotTextState((e.target.value))}
                            />
                        <Form.Text className="text-danger">
                            {validateNotif}
                        </Form.Text>
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Check 
                            type='checkbox'
                            id={`default-checkbox`}
                            label={`Важное`}
                            checked={importantStatus}
                            onChange={handleChange}
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

export default CourseNotifDialog;