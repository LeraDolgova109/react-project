import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { setMarkThunkCreator } from '../../reducers/courses-reducer';


function CourseMarkDialog(props) {
    const dispatch = useDispatch();

    let stepName = "";
    let markType = "";
    if (props.step === 'midtermResult')
    {
        stepName = '"Промежуточной аттестации"';
        markType = 'Midterm';
    }
    else
    {
        stepName = '"Финальной аттестации"';
        markType = 'Final';
    }
    const [studentMark, setMarkState] = useState('');

    function closeDialog(){
        props.onHide();
    }

    function saveDialog(event){
        event.preventDefault();
        dispatch(setMarkThunkCreator(props.id, props.value.id, {
            "markType": markType,
            "mark": studentMark
        }));
        props.onHide();
    }

    const handleChange = (e) => {
        const { value, checked } = e.target;
         
        if (checked) {
            setMarkState(value);
        }
    }
    return (
        <Modal
            size='lg'
           {...props}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Изменение оценки для {stepName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Студент - {props.value.name}</Form.Label>
                        <div key='inline-radio' className="mb-3">
                            <Form.Check
                                inline
                                type='radio'
                                name="group1"
                                id='inline-radio-2'
                                label='Пройдено'
                                value='Passed'
                                onChange={handleChange}
                            />
                            <Form.Check
                                inline
                                type='radio'
                                name="group1"
                                id='inline-radio-1'
                                label='Зафейлено'
                                value='Failed'
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

export default CourseMarkDialog;