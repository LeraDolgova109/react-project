import React from 'react'
import {ListGroup, Row, Col, Container} from "react-bootstrap";
import '../../App.css';

function GroupItem(props){
    let statuses = new Map();
    let semesters = new Map();

    statuses.set('Created', 'Создан');
    statuses.set('OpenForAssigning', 'Открыт для записи');
    statuses.set('Started', 'В процессе обучения');
    statuses.set('Finished', 'Закрыт');

    semesters.set('Spring', 'Весенний');
    semesters.set('Autumn', 'Осенний');

    let status = props.status;

    return (
        <ListGroup.Item className="item">
            <Container  onClick={() => {window.location.pathname=('courses/' + props.id)}}>
                <Row className="justify-content-md-center">
                    <Col sm={9}>
                        <Row>
                            <span className="fs-5 fw-bold">
                                {props.name}
                            </span>
                        </Row>
                        <Row>
                            <span className="text-dark">
                                Учебный год - {props.startYear}-{props.startYear + 1}
                            </span>
                        </Row>
                        <Row>
                            <span className="text-dark">
                                Семестр - {semesters.get(props.semester)}
                            </span>
                        </Row>
                        <Row>
                            <span className="text-secondary">
                                Мест всего - {props.maximumStudentsCount}
                            </span>
                        </Row>
                        <Row>
                            <span className="text-secondary">
                                 Мест свободно - {props.remainingSlotsCount}
                            </span>
                        </Row>
                    </Col>
                    <Col className="d-flex justify-content-end" sm={3}>
                        {status === 'Created' &&
                            <span className="text-secondary fw-bold">
                            {statuses.get(status)}
                            </span>
                        }
                        {status === 'OpenForAssigning' &&
                            <span className="text-success fw-bold">
                            {statuses.get(status)}
                            </span>
                        }
                        {status === 'Started' &&
                            <span className="text-primary fw-bold">
                            {statuses.get(status)}
                            </span>
                        }
                        {status === 'Finished' &&
                            <span className="text-danger fw-bold">
                            {statuses.get(status)}
                            </span>
                        }
                    </Col>
                </Row>
            </Container>
        </ListGroup.Item>
    )
}

export default GroupItem;