import React from "react"
import {Navbar, Nav, Container} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

function NavbarCustom(props) {
    if (localStorage.getItem('token') !== 'null' && props.profile.user.info !== 401) {
        return (
            <Navbar bg="secondary" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Navbar.Brand>Кампусные курсы</Navbar.Brand>
                        </LinkContainer>
                        <LinkContainer to="/groups">
                            <Nav.Link>Группы курсов</Nav.Link>
                        </LinkContainer>
                        { props.profile.user.roles.isStudent === true &&
                            <LinkContainer to="/courses/my">
                                <Nav.Link>Мои курсы</Nav.Link>
                            </LinkContainer>
                        }
                        { props.profile.user.roles.isTeacher === true &&
                            <LinkContainer to="/courses/teaching">
                                <Nav.Link>Преподаваемые курсы</Nav.Link>
                            </LinkContainer>
                        }
                    </Nav>
                    <Nav>
                        <LinkContainer to="/profile">
                            <Nav.Link>{props.profile.user.info.email}</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/logout">
                            <Nav.Link>Выход</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Container>
            </Navbar>
        );
    } else {
        return (
            <Navbar bg="secondary" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Navbar.Brand>Кампусные курсы</Navbar.Brand>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        <LinkContainer to="/registration">
                            <Nav.Link>Регистрация</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/login">
                            <Nav.Link>Вход</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Container>
            </Navbar>
        );
    }
}

export default NavbarCustom;