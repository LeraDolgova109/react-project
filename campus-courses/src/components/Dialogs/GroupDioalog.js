import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {useDispatch} from "react-redux";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import UserSelect from "./Select/UserSelect";
import CourseStartYearSelect from "./Select/CourseStartYearSelect";
import CourseStudentsCountSelect from "./Select/CourseStudentsCountSelect";
import { createCourseThunkCreator } from '../../reducers/group-reducer';


function GroupDialog(props) {
    const dispatch = useDispatch();
    const [requirementsEditorState, setRequirementsEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [convertedReqContent, setConvertedReqContent] = useState(null);

    useEffect(() => {
        let html = convertToHTML(requirementsEditorState.getCurrentContent());
        setConvertedReqContent(html);
    }, [requirementsEditorState]);

    const [annotationsEditorState, setAnnotationsEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [convertedAnnotContent, setConvertedAnnotContent] = useState(null);

    useEffect(() => {
        let html = convertToHTML(annotationsEditorState.getCurrentContent());
        setConvertedAnnotContent(html);
    }, [annotationsEditorState]);

    const [semester, setSemesterState] = useState('');

    const [course, setCourseState] = useState({
        name: '',
        startYear: 2023,
        maximumStudentsCount: 1,
        semester: semester,
        requirements: '',
        annotations: '',
        mainTeacherId: ''
    });

    function range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }

    const users = props.users;
    const years = range(2000, 2029);
    const counts = range(1, 200);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedYear, setSelectedYear] = useState(2000);
    const [selectedCount, setSelectedCount] = useState(1);

    const [validateName, setValidateName] = useState('');
    const [validateTeacher, setValidateTeacher] = useState('');
    const [validateSemester, setValidateSemester] = useState('');

    function closeDialog(){
        props.onHide();
    }

    function validate()
    {
        let correctName = false;
        let correctSemester = false;
        let correctTeacher = false;
        if (course.name.length === 0) {
            setValidateName('Длина названия должна быть минимум 1 символ');
        }
        else {
            setValidateName('');
            correctName = true;
        }
        if (selectedUser === '') {
            setValidateTeacher('Пользователь не выбран');
        }
        else {
            setValidateTeacher('');
            correctSemester = true;
        }
        if (semester === '') {
            setValidateSemester('Семестр не выбран');
        }
        else {
            setValidateSemester('');
            correctTeacher = true;
        }
        return correctName && correctSemester && correctTeacher;
    }
    function saveDialog(event){
        event.preventDefault();
        course.startYear = Number(selectedYear);
        course.maximumStudentsCount = Number(selectedCount);
        course.requirements = convertedReqContent;
        course.annotations = convertedAnnotContent;
        course.mainTeacherId = selectedUser;
        course.semester = semester;
        if (validate()) {
            dispatch(createCourseThunkCreator(course, props.groupid));
            props.onHide();
        }
    }
    const handleChange = (e) => {
        const { value, checked } = e.target;
         
        if (checked) {
          setSemesterState(value);
        }
    }

    return (
        <Modal
            size='lg'
           {...props}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Создание курса</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Название курса</Form.Label>
                        <Form.Control
                            type="text"
                            value={course.name}
                            onChange={e => {
                                setCourseState({
                                    ...course,
                                    name: e.target.value
                                });
                            }}
                            autoFocus
                        />
                        <Form.Text className="text-danger">
                            {validateName}
                        </Form.Text>
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Год начала курса</Form.Label>
                        <CourseStartYearSelect
                            value={selectedYear}
                            onChange={year => setSelectedYear(year)}
                            defaultValue='Год начала курса'
                            options={years}
                        />
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Общее количество мест</Form.Label>
                        <CourseStudentsCountSelect
                            value={selectedCount}
                            onChange={count => setSelectedCount(count)}
                            defaultValue='Общее количество мест'
                            options={counts}
                        />
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Семестр</Form.Label>
                        <div key='inline-radio' className="mb-3">
                            <Form.Check
                                inline
                                type='radio'
                                name="group1"
                                id='inline-radio-2'
                                label='Осенний'
                                value='Autumn'
                                onChange={handleChange}
                            />
                            <Form.Check
                                inline
                                type='radio'
                                name="group1"
                                id='inline-radio-1'
                                label='Весенний'
                                value='Spring'
                                onChange={handleChange}
                            />
                        </div>
                        <Form.Text className="text-danger">
                            {validateSemester}
                        </Form.Text>
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Требования</Form.Label>
                        <Editor
                            editorState={requirementsEditorState}
                            onEditorStateChange={setRequirementsEditorState}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                        />
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Аннотации</Form.Label>
                        <Editor
                            editorState={annotationsEditorState}
                            onEditorStateChange={setAnnotationsEditorState}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                        />
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Основной преподаватель курса</Form.Label>
                        <UserSelect
                            value={selectedUser}
                            onChange={user => setSelectedUser(user)}
                            defaultValue='Список пользователей'
                            options={users}
                        />
                        <Form.Text className="text-danger">
                            {validateTeacher}
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeDialog}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={saveDialog}>
                    Создать
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default GroupDialog;