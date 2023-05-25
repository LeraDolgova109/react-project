import React, {useState} from 'react'
import {Container, Form, Button, Col, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {editProfileThunkCreator} from "../../reducers/profile-reducer";

function ProfileForm(props) {
    const dispatch = useDispatch();

    let data = {
        fullName: props.fullName,
        birthDate: props.birthDate.substring(0, 10),
        email: props.email,
    };
    const [userData, setUserData] = useState({
        fullName: "",
        birthDate: "",
        email: "",
    });

    if (props.email !== '' && userData.email === '') {
        setUserData(data);
    }

    const [validateFullName, setValidateFullName] = useState('');
    const [validateBirthDate, setValidateBirthDate] = useState('');

    function validation()
    {
        let correctName = false;
        let correctBirthDate = false;
        if (userData.fullName === ''){
            setValidateFullName('Длина имени должна быть больше 1 символа');
        }
        else{
            setValidateFullName('');
            correctName = true;
        }
        if (new Date(userData.birthDate) > new Date()){
            setValidateBirthDate('Дата рождения не должна быть позднее сегодняшней даты');
        }
        else{
            setValidateBirthDate('');
            correctBirthDate = true;
        }
        return correctName && correctBirthDate;
    }
    function handleSubmit(event) {
        event.preventDefault();
        if (validation()) {
            dispatch(editProfileThunkCreator({
                "fullName": userData.fullName,
                "birthDate": (new Date(userData.birthDate)).toISOString(),
                "email": userData.email
            }));
        }
    }
    return (
        <Container style={{marginTop: 30 + "px", padding: 5 + "px"}}>
            <h1>Профиль</h1>
            <Form style={{marginTop: 20 + "px"}}>
                <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
                    <Form.Label column sm="2">ФИО</Form.Label>
                    <Col sm="10">
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
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                    <Form.Label column sm="2">Email</Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue={userData.email} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">День рождения</Form.Label>
                    <Col sm="10">
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
                    </Col>
                </Form.Group>

                <Button variant="primary" onClick={handleSubmit}>
                    Изменить
                </Button>
            </Form>
        </Container>
    )
}

export default ProfileForm;