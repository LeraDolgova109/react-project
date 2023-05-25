import Axios from "axios";
import swal from 'sweetalert';

const baseUrl = 'https://camp-courses.api.kreosoft.space/';

function getGroups(){
    let token = localStorage.getItem('token');

    return Axios.get(baseUrl+'groups', {
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

function deleteGroup(id){
    let token = localStorage.getItem('token');

    return Axios.delete(baseUrl+'groups/' + id, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then(response => {
        if (response.status === 200)
        {
            swal('Успех!', 'Группа успешно удалена', 'success');
            return response.data;
        }
    })
        .catch(error => {
            swal('Ошибка', 'Произошла ошибка', 'error');
            return error.response.status;
        });
}

function updateGroup(id, groupName){
    let token = localStorage.getItem('token');

    return Axios.put(baseUrl+'groups/' + id,
        {
            name: groupName
        },
        {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then(response => {
        if (response.status === 200)
        {
            swal('Успех!', 'Группа успешно отредактирована', 'success');
            return response.data;
        }
    })
        .catch(error => {
            swal('Ошибка', 'Произошла ошибка', 'error');
            return error.response.status;
        });
}

function createGroup(groupName){
    let token = localStorage.getItem('token');

    return Axios.post(baseUrl+'groups',
        {
            name: groupName
        },
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(response => {
        if (response.status === 200)
        {
            swal('Успех!', 'Группа успешно создана', 'success');
            return response.data;
        }
    })
        .catch(error => {
            swal('Ошибка', 'Произошла ошибка', 'error');
            return error.response.status;
        });
}

export const groupsApi = {
    getGroups : getGroups,
    deleteGroup : deleteGroup,
    updateGroup : updateGroup,
    createGroup : createGroup,
}