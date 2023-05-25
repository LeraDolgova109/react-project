import React, { useState } from 'react'
import {Button, Container} from "react-bootstrap";
import CourseMainInfo from "./CourseDetailComponents/CourseMainInfo";
import CourseTab from "./CourseDetailComponents/CourseTab";
import CourseUsers from "./CourseDetailComponents/CourseUsers";
import CourseInfoDialog from "../Dialogs/CourseInfoDialog";
import DeleteCourseDialog from "../Dialogs/DeleteCourseDialog";
import '../../App.css';

function CourseDetail(props) {
    const [modalUpdateShow, setModalUpdateShow] = useState(false);
    const [modalDeleteShow, setModalDeleteShow] = useState(false);

    return (
        <>
        <Container>
            <h1> {props.courses.coursesInfo.name} </h1>
            <div className='course-item'>
                <div className="d-flex justify-content-between">
                <h5>Основные данные курса</h5>
                <div>
                {(props.courses.isTeacher || props.profile.user.roles.isAdmin) &&
                    <>
                    <Button variant="warning" style={{marginBottom: 4 + 'px'}}
                            onClick={() => setModalUpdateShow(true)}>
                        Редактировать
                    </Button>
                    </>
                }
                {props.profile.user.roles.isAdmin &&
                    <>
                        <Button variant="danger" style={{marginBottom: 4 + 'px', marginLeft: 3 + 'px'}}
                                onClick={() => setModalDeleteShow(true)}>
                            Удалить
                        </Button>
                    </>
                }
                </div>
                </div>
                <CourseMainInfo {...props}/>
            </div>
            <div className='course-item'>
                <CourseTab {...props}/>
            </div>
            <div className='course-item'>
                <CourseUsers {...props}/>
            </div>
        </Container>
        <CourseInfoDialog
            show={modalUpdateShow}
            onHide={() => setModalUpdateShow(false)}
            requirements={props.courses.coursesInfo.requirements}
            annotations={props.courses.coursesInfo.annotations}
            id={props.id}
        />
        <DeleteCourseDialog
            show={modalDeleteShow}
            onHide={() => setModalDeleteShow(false)}
            id={props.id}
        />
        </>
    )
}

export default CourseDetail;