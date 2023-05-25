import React from 'react';
import {Container} from "react-bootstrap";
import GroupComponent from "../components/MyCourses/Teaching/GroupComponent";
import '../App.css';

function TeachingCourses() {
    return (
        <Container className="block">
            <h1>Преподаваемые курсы</h1>
            <GroupComponent/>
        </Container>
    )
}

export {TeachingCourses}