import Axios from "axios";

const baseUrl = 'https://camp-courses.api.kreosoft.space/';

function getUsers(){
    let token = localStorage.getItem('token');

    return Axios.get(baseUrl+'users',{
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then(response => {
        if (response.status === 200)
        {
            return response.data
        }
    })
        .catch(error => {
            return error.response.status
        });
}

export const usersApi = {
    getUsers : getUsers
}