import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {ListGroup, Row, Col, Button} from "react-bootstrap";
import CourseStatusDialog from "../../Dialogs/CourseStatusDialog";
import {signUpThunkCreator} from "../../../reducers/courses-reducer";
import '../../../App.css';

function CourseMainInfo(props) {
    const dispatch = useDispatch();
    let statuses = new Map();
    let semesters = new Map();

    statuses.set('Created', 'Создан');
    statuses.set('OpenForAssigning', 'Открыт для записи');
    statuses.set('Started', 'В процессе обучения');
    statuses.set('Finished', 'Закрыт');

    semesters.set('Spring', 'Весенний');
    semesters.set('Autumn', 'Осенний');

    let status = props.courses.coursesInfo.status;

    function handleSubmit(){
        dispatch(signUpThunkCreator(props.id));
    }

    const [modalStatusShow, setModalStatusShow] = useState(false);

    return (
        <>
        <ListGroup>
            <ListGroup.Item>
                <Row>
                    <Col>
                        <Row>
                        <span className='fw-bold'>Статус курса</span>
                        {status === 'Created' &&
                            <span className="text-secondary">
                                {statuses.get(status)}
                            </span>
                        }
                        {status === 'OpenForAssigning' &&
                            <span className="text-success">
                                {statuses.get(status)}
                            </span>
                        }
                        {status === 'Started' &&
                            <span className="text-primary">
                                {statuses.get(status)}
                            </span>
                        }
                        {status === 'Finished' &&
                            <span className="text-danger">
                                {statuses.get(status)}
                            </span>
                        }
                        </Row>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        {(props.courses.isTeacher || props.profile.user.roles.isAdmin) &&
                            <Button variant="warning"
                                    style={{marginBottom: 4 + 'px'}}
                                    onClick={() => setModalStatusShow(true)}>
                                Изменить
                            </Button>
                        }

                        {(props.courses.isStudent !== true
                                && props.courses.isTeacher !== true
                                && status === 'OpenForAssigning')  &&
                            <Button variant="success"
                                    style={{marginBottom: 4 + 'px', marginLeft: 3 + 'px'}}
                                    onClick={handleSubmit}>
                                Записаться на курс
                            </Button>
                        }
                    </Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                    <Col>
                        <Row>
                            <span className='fw-bold'>Учебный год</span>
                            <span>{props.courses.coursesInfo.startYear}-{props.courses.coursesInfo.startYear + 1}</span>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <span className='fw-bold'>Семестр</span>
                            <span>{semesters.get(props.courses.coursesInfo.semester)}</span>
                        </Row>
                    </Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                    <Col>
                        <Row>
                            <span className='fw-bold'>Всего мест</span>
                            <span>{props.courses.coursesInfo.maximumStudentsCount}</span>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <span className='fw-bold'>Студентов зачислено</span>
                            <span>{props.courses.coursesInfo.studentsEnrolledCount}</span>
                        </Row>
                    </Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                    <span className='fw-bold'>Заявок на рассмотрении</span>
                    <span>{props.courses.coursesInfo.studentsInQueueCount}</span>
                </Row>
            </ListGroup.Item>
        </ListGroup>
        <CourseStatusDialog
            show={modalStatusShow}
            onHide={() => setModalStatusShow(false)}
            id={props.id}
            status={status}
        />
        </>
    )
}

export default CourseMainInfo;