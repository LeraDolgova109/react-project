import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Container, Form, Button} from "react-bootstrap";
import { loginThunkCreator } from '../../reducers/profile-reducer';

function LoginForm() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(loginThunkCreator(email, password));
    }
    
    return (
        <Container className="block">
            <h1>Авторизация</h1>
            <Form style={{marginTop: 20 + "px"}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail((e.target.value))}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        password={password}
                        onChange={(e) => setPassword((e.target.value))}
                    />
                </Form.Group>

                <Button variant="primary" onClick={handleSubmit}>
                    Войти
                </Button>
            </Form>
        </Container>
    )
}

export default LoginForm;