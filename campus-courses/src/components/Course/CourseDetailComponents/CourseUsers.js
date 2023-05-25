import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import {Tabs, Tab, Badge, ListGroup, Row, Col, Button} from "react-bootstrap";
import { setStudentStatusThunkCreator } from '../../../reducers/courses-reducer';
import CourseTeacherDialog from "../../Dialogs/CourseTeacherDialog";
import CourseMarkDialog from "../../Dialogs/CourseMarkDialog";
import '../../../App.css';

function CourseUsers(props) {
    const dispatch = useDispatch();
    const [modalTeacherShow, setModalTeacherShow] = useState('');
    const [modalMarkShow, setModalMarkShow] = useState('');
    const [studentValue, setStudentValuestate] = useState({});
    const [stepName, setStepNamestate] = useState('');

    let statuses = new Map();

    statuses.set('InQueue', 'в очереди');
    statuses.set('Accepted', 'принят в группу');
    statuses.set('Declined', 'отклонен');

    let marks = new Map();

    marks.set('NotDefined', 'отметки нет');
    marks.set('Passed', 'успешно пройдена');
    marks.set('Failed', 'зафейлена');

    function handleStudentStatusSubmit(studentId, status){
        dispatch(setStudentStatusThunkCreator(props.id, studentId, status));
    }

    function handleStudentMark(value, step){
        setStudentValuestate(value);
        setStepNamestate(step);
        setModalMarkShow(true);
    }

    return (
        <>
        <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-2"
            fill
        >
            <Tab eventKey="teachers" title="Преподаватели">
                {(props.profile.user.roles.isAdmin === true || props.courses.isMainTeacher === true) &&
                    <Button variant="primary"
                            onClick={() => setModalTeacherShow(true)}>
                        Добавить преподавателя
                    </Button>
                }
                <ListGroup variant="flush">
                    {props.courses.coursesInfo.teachers &&
                        props.courses.coursesInfo.teachers.map((value, i) => {
                            return (<ListGroup.Item key={i} id={value.id}>
                                <Row>
                                    <Row>
                                        <Col>
                                            <span className="fw-bold">{value.name}</span>
                                            {value.isMain === true &&
                                                <Badge bg="success" style={{marginLeft: 3+'px'}}>основной</Badge>
                                            }
                                        </Col>
                                    </Row>
                                    <Row><span className="text-secondary">{value.email}</span></Row>
                                </Row>
                            </ListGroup.Item>)
                        })
                    }
                </ListGroup>
            </Tab>
            <Tab eventKey="students" title="Студенты">
                <ListGroup variant="flush">
                    {props.courses.coursesInfo.students &&
                        props.courses.coursesInfo.students.map((value, i) => {
                            return (<ListGroup.Item key={i} id={value.id}>
                                <Row>
                                <Col sm={4}>
                                <Row>
                                    <Row>
                                            <span>{value.name}</span>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span className="text-secondary">Статус - </span>
                                            {value.status === 'Accepted' &&
                                                <span className="text-success">
                                                {statuses.get(value.status)}
                                                </span>
                                            }
                                            {value.status === 'InQueue' &&
                                                <span className="text-primary">
                                                {statuses.get(value.status)}
                                                </span>
                                            }
                                            {value.status === 'Declined' &&
                                                <span className="text-danger">
                                                {statuses.get(value.status)}
                                                </span>
                                            }
                                        </Col>
                                        <Row><span className="text-secondary">{value.email}</span></Row>
                                    </Row>
                                </Row>
                                </Col>
                                {(props.courses.isStudent === true && 
                                    props.profile.user.roles.isAdmin !== true) &&
                                    <>
                                    <Col sm={4}>
                                        {props.profile.user.info.email === value.email &&
                                            <>
                                            <span>Промежуточная аттестация - </span>
                                            {value.midtermResult === 'Passed' &&
                                                <Badge bg="success">
                                                {marks.get(value.midtermResult)}
                                                </Badge>
                                            }
                                            {value.midtermResult === 'NotDefined' &&
                                                <Badge bg="secondary">
                                                {marks.get(value.midtermResult)}
                                                </Badge>
                                            }
                                            {value.midtermResult === 'Failed' &&
                                                <Badge bg="danger">
                                                {marks.get(value.midtermResult)}
                                                </Badge>
                                            }
                                            </>
                                        }
                                    </Col>
                                    <Col sm={4}>
                                        {props.profile.user.info.email === value.email &&
                                            <>
                                            <span>Финальная аттестация - </span>
                                            {value.finalResult === 'Passed' &&
                                                <Badge bg="success">
                                                {marks.get(value.finalResult)}
                                                </Badge>
                                            }
                                            {value.finalResult === 'NotDefined' &&
                                                <Badge bg="secondary">
                                                {marks.get(value.finalResult)}
                                                </Badge>
                                            }
                                            {value.finalResult === 'Failed' &&
                                                <Badge bg="danger">
                                                {marks.get(value.finalResult)}
                                                </Badge>
                                            }
                                            </>
                                        }
                                    </Col>
                                    </>
                                }
                                {(props.courses.isStudent === false
                                    && props.courses.isTeacher === true
                                        || props.profile.user.roles.isAdmin === true) &&
                                    <>
                                    {value.status === 'Accepted' &&
                                        <>
                                        <Col sm={4}>
                                            <span className="item"
                                                onClick={() => handleStudentMark(value, 'midtermResult')}>
                                                    Промежуточная аттестация
                                            </span>
                                            <span> - </span>
                                            {value.midtermResult === 'Passed' &&
                                                <Badge bg="success">
                                                    {marks.get(value.midtermResult)}
                                                </Badge>
                                            }
                                            {value.midtermResult === 'NotDefined' &&
                                                <Badge bg="secondary">
                                                    {marks.get(value.midtermResult)}
                                                </Badge>
                                            }
                                            {value.midtermResult === 'Failed' &&
                                                <Badge bg="danger">
                                                    {marks.get(value.midtermResult)}
                                                </Badge>
                                            }
                                        </Col>
                                        <Col sm={4}>
                                            <span className="item"
                                                onClick={() => handleStudentMark(value, 'finalResult')}>
                                                    Финальная аттестация 
                                            </span>
                                            <span> - </span>
                                            {value.finalResult === 'Passed' &&
                                                <Badge bg="success">
                                                    {marks.get(value.finalResult)}
                                                </Badge>
                                            }
                                            {value.finalResult === 'NotDefined' &&
                                                <Badge bg="secondary">
                                                    {marks.get(value.finalResult)}
                                                </Badge>
                                            }
                                            {value.finalResult === 'Failed' &&
                                                <Badge bg="danger">
                                                    {marks.get(value.finalResult)}
                                                </Badge>
                                            }
                                        </Col>
                                        </>
                                    }
                                        {value.status === 'InQueue' &&
                                            <>
                                                <Col sm={8} className="d-flex justify-content-end">
                                                    <Button variant="primary"
                                                            onClick={(event) =>
                                                            handleStudentStatusSubmit(value.id, 'Accepted')}>
                                                        Принять
                                                    </Button>
                                                    <Button variant="danger"
                                                            onClick={(event) =>
                                                            handleStudentStatusSubmit(value.id, 'Declined')}>
                                                        Отклонить заявку
                                                    </Button>
                                                </Col>
                                            </>
                                        }
                                    </>
                                }
                                </Row>
                            </ListGroup.Item>)
                        })
                    }
                </ListGroup>
            </Tab>
        </Tabs>
        <CourseTeacherDialog
            show={modalTeacherShow}
            onHide={() => setModalTeacherShow(false)}
            id={props.id}
            users={props.profile.users}
        />
        <CourseMarkDialog
            show={modalMarkShow}
            onHide={() => setModalMarkShow(false)}
            id={props.id}
            value={studentValue}
            step={stepName}
        />
        </>
    )
}

export default CourseUsers;