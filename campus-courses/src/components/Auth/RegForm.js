import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Form, Button, Row} from "react-bootstrap";
import { regThunkCreator } from '../../reducers/profile-reducer';

function RegForm() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.profile.validation);

    const [userData, setUserData] = useState({
        fullName: "",
        birthDate: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [validateFullName, setValidateFullName] = useState('');
    const [validateBirthDate, setValidateBirthDate] = useState('');
    const [validateEmail, setValidateEmail] = useState('');
    const [validatePassword, setValidatePassword] = useState('');
    const [validateConfirmPassword, setValidateConfirmPassword] = useState('');

    function validation()
    {
        if (userData.fullName === ''){
            setValidateFullName('Длина имени должна быть больше 1 символа');
        }
        else{
            setValidateFullName('');
        }
        if (userData.birthDate === '' || new Date(userData.birthDate) > new Date()){
            setValidateBirthDate('Поле должно быть заполнено. Дата рождения не должна быть позднее сегодняшней даты');
        }
        else{
            setValidateBirthDate('');
        }
        if (userData.email === ''){
            setValidateEmail('Email должен быть заполнен');
        }
        else if (state.Email){
            if (state.Email.length !== 0){
                if (state.Email[0] === 'The Email field is not a valid e-mail address.'){
                    setValidateEmail('Email некорректный');
                }
            }
            if (state.Email.length !== 0){
                if (state.Email[0] === 'User with this email is already registered.'){
                    setValidateEmail('Email уже зарегестрирован');
                }
            }
        }
        else{
            setValidateEmail('');
        }
        if ( userData.password.length < 6 || userData.password.length > 32){
            setValidatePassword('Длина пароля должна быть от 6 до 32 символов');
        }
        else if (state.Password){
            if (state.Password.length !== 0){
                if (state.Password[0] === "Password requires at least one digit"){
                    setValidatePassword('Пароль должен содержать хотя бы одну цифру');
                }
            }
        }
        else{
            setValidatePassword('');
        }
        if ( userData.password !== userData.confirmPassword){
            setValidateConfirmPassword('Пароли не совпадают');
        }
        else{
            setValidateConfirmPassword('');
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(regThunkCreator(userData));
        validation();
    }
    
    return (
        <Container className="block">
            <h1>Регистрация нового пользователя</h1>
            <Form style={{marginTop: 20 + "px"}}>
                <Form.Group className="mb-3" controlId="validationCustom01">
                    <Form.Label>ФИО</Form.Label>
                    <Form.Control
                        type="text"
                        value={userData.fullName}
                        onChange={e => {
                            setUserData({
                                ...userData,
                                fullName: e.target.value
                            });
                        }}
                    />
                    <Form.Text className="text-danger">
                        {validateFullName}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>День рождения</Form.Label>
                    <Form.Control
                        type="date"
                        value={userData.birthDate}
                        onChange={e => {
                            setUserData({
                                ...userData,
                                birthDate: e.target.value
                            });
                        }}
                    />
                    <Form.Text className="text-danger">
                        {validateBirthDate}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={userData.email}
                        onChange={e => {
                            setUserData({
                                ...userData,
                                email: e.target.value
                            });
                        }}
                    />
                    <Row>
                        <Form.Text className="text-muted">
                            Email будет использоваться для входа в систему
                        </Form.Text>
                        <Form.Text className="text-danger">
                            {validateEmail}
                        </Form.Text>
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        value={userData.password}
                        onChange={e => {
                            setUserData({
                                ...userData,
                                password: e.target.value
                            });
                        }}
                    />
                    <Form.Text className="text-danger">
                        {validatePassword}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Повторите пароль</Form.Label>
                    <Form.Control
                        type="password"
                        value={userData.confirmPassword}
                        onChange={e => {
                            setUserData({
                                ...userData,
                                confirmPassword: e.target.value
                            });
                        }}
                    />
                    <Form.Text className="text-danger">
                        {validateConfirmPassword}
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" onClick={handleSubmit}>
                    Зарегестрироваться
                </Button>
            </Form>
        </Container>
    )
}

export default RegForm;