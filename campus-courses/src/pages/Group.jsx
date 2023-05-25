import React from 'react';
import {Container} from "react-bootstrap";
import {useParams} from "react-router-dom";
import GroupComponent from "../components/Group/GroupComponent";
import '../App.css';

function Group() {
    const id = useParams();

    return (
        <Container className="block">
            <GroupComponent {...id}/>
        </Container>
    )
}

export {Group}