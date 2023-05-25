import React, {useState} from 'react'
import {ListGroup, Tabs, Tab, Button, Badge} from "react-bootstrap";
import CourseNotifDialog from "../../Dialogs/CourseNotifDialog"
import '../../../App.css';

function CourseTab(props) {
    const [modalStatusShow, setModalStatusShow] = useState(false);

    return (
        <>
        <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3"
            fill
        >
            <Tab eventKey="requirements" title="Требования к курсу">
                <div dangerouslySetInnerHTML={{__html: props.courses.coursesInfo.requirements}}/>
            </Tab>
            <Tab eventKey="annotations" title="Аннотация">
                <div dangerouslySetInnerHTML={{__html: props.courses.coursesInfo.annotations}}/>
            </Tab>
            <Tab eventKey="notifications"
                 title={
                     <React.Fragment>
                         Уведомления
                         {props.courses.coursesInfo.notifications &&
                             <Badge bg='danger' style={{marginLeft: 2+'px'}}>
                                 {props.courses.coursesInfo.notifications.length}
                             </Badge>
                         }
                     </React.Fragment>
                 }>
                {(props.profile.user.roles.isAdmin === true || props.courses.isTeacher === true) &&
                    <Button variant="primary"
                            onClick={() => setModalStatusShow(true)}>
                            Создать уведомление
                    </Button>
                }
                <ListGroup variant="flush">
                    {props.courses.coursesInfo.notifications &&
                        props.courses.coursesInfo.notifications.map((value, i) => {
                            if (value.isImportant === true)
                                return <ListGroup.Item variant="danger" key={i} id={value.id}>{value.text}</ListGroup.Item>
                            return <ListGroup.Item key={i} id={value.id}>{value.text}</ListGroup.Item>
                        })
                    }
                </ListGroup>
            </Tab>
        </Tabs>
        <CourseNotifDialog
            show={modalStatusShow}
            onHide={() => setModalStatusShow(false)}
            id={props.id}
        />
        </>
    )
}

export default CourseTab;