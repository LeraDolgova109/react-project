import React from 'react';
import {Container} from "react-bootstrap";
import GroupComponent from "../components/MyCourses/Study/GroupComponent";
import '../App.css';

function MyCourses() {
    return (
        <Container className="block">
            <h1>Мои курсы</h1>
            <GroupComponent/>
        </Container>
    )
}

export {MyCourses}