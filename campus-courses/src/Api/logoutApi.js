import Axios from "axios";

const baseUrl = 'https://camp-courses.api.kreosoft.space/';

function postLogout(){
    let token = localStorage.getItem('token');
    return Axios.post(baseUrl+'logout', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then(response => {
        if (response.status === 200)
        {
            localStorage.setItem('token', 'null');
            window.location.href = '/';
            return response.data
        }
    })
        .catch(error => {
            localStorage.setItem('token', 'null');
            window.location.href = '/';
            return error.response.status
        });
}

export default postLogout;