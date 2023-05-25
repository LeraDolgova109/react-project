import Axios from "axios";
import swal from "sweetalert";

const baseUrl = 'https://camp-courses.api.kreosoft.space/';

function getProfile(){
    let token = localStorage.getItem('token');

    return Axios.get(baseUrl+'profile', {
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
function getRoles(){
    let token = localStorage.getItem('token');

    return Axios.get(baseUrl+'roles', {
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

function putProfile(fullName, birthDate) {
    let token = localStorage.getItem('token');

    return Axios.put(baseUrl + 'profile',
        {
            fullName: fullName,
            birthDate: birthDate
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            },
        }).then(response => {
        if (response.status === 200) {
            swal('Успех!', 'Данные изменены', 'success');
            return response.data;
        }
    })
        .catch(error => {
            return error.response.status
        });
}



export const profileApi = {
    getProfile : getProfile,
    getRoles : getRoles,
    putProfile : putProfile,
}