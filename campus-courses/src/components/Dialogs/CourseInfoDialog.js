import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {useDispatch} from "react-redux";
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { setCourseInfoThunkCreator } from '../../reducers/courses-reducer';


function CourseInfoDialog(props) {
    const dispatch = useDispatch();

    let htmlReq = props.requirements;
    let blocksFromHTMLReq = convertFromHTML(htmlReq);
    let contentReq = ContentState.createFromBlockArray(blocksFromHTMLReq);

    const [requirementsEditorState, setRequirementsEditorState] = useState(
        () => EditorState.createWithContent(contentReq),
    );
    const [convertedReqContent, setConvertedReqContent] = useState(null);

    useEffect(() => {
        let HTML = convertToHTML(requirementsEditorState.getCurrentContent());
        setConvertedReqContent(HTML);
    }, [requirementsEditorState]);

    let htmlAnnot = props.annotations;
    let blocksFromHTMLAnnot = convertFromHTML(htmlAnnot);
    let contentAnnot = ContentState.createFromBlockArray(blocksFromHTMLAnnot);

    const [annotationsEditorState, setAnnotationsEditorState] = useState(
        () => EditorState.createWithContent(contentAnnot),
    );
    const [convertedAnnotContent, setConvertedAnnotContent] = useState(null);

    useEffect(() => {
        let HTML = convertToHTML(annotationsEditorState.getCurrentContent());
        setConvertedAnnotContent(HTML);
    }, [annotationsEditorState]);

    function closeDialog(){
        props.onHide();
    }

    function saveDialog(event){
        event.preventDefault();
        dispatch(setCourseInfoThunkCreator(props.id, {
            "requirements": convertedReqContent, 
            "annotations": convertedAnnotContent
        }));
        props.onHide();
    }


    return (
        <Modal
            size='lg'
           {...props}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Редактирование курса</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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

export default CourseInfoDialog;