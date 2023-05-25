import React from 'react';
import {Container} from "react-bootstrap";
import {useParams} from "react-router-dom";
import CourseComponent from "../components/Course/CourseComponent";
import '../App.css';

function Course() {
    return (
        <Container className="block">
            <CourseComponent {...useParams()}/>
        </Container>
    )
}

export {Course}