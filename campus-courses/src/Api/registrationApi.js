import Axios from "axios";

const baseUrl = 'https://camp-courses.api.kreosoft.space/';

function postRegistration(userData){
    return Axios.post(baseUrl+'registration',{
        fullName: userData.fullName,
        birthDate: userData.birthDate,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword
    }).then(response => {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
    })
        .catch(error => {
            if (error.response.status === 409){
                return {Email: ["User with this email is already registered."]};
            }
            return error.response.data.errors;
        })
}

export default postRegistration;