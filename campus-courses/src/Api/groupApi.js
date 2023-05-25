import Axios from "axios";
import swal from 'sweetalert';

const baseUrl = 'https://camp-courses.api.kreosoft.space/';

function getGroup(id){
    let token = localStorage.getItem('token');

    return Axios.get(baseUrl+'groups/' + id, {
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

function getMyCourses(){
    let token = localStorage.getItem('token');

    return Axios.get(baseUrl+'courses/' + 'my', {
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

function getTeachingCourses(){
    let token = localStorage.getItem('token');

    return Axios.get(baseUrl+'courses/' + 'teaching', {
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

function createCourse(data, groupID){
    let token = localStorage.getItem('token');

    return Axios.post(baseUrl+'courses/'+groupID,
        {
            name: data.name,
            startYear: data.startYear,
            maximumStudentsCount: data.maximumStudentsCount,
            semester: data.semester,
            requirements: data.requirements,
            annotations: data.annotations,
            mainTeacherId: data.mainTeacherId
        },
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(response => {
        if (response.status === 200)
        {
            swal('Успех!', 'Курс успешно создан!', 'success');
            return response.data;
        }
    })
        .catch(error => {
            swal('Ошибка', 'Произошла ошибка', 'error');
            return error.response.status;
        });
}

export const groupApi = {
    getGroup : getGroup,
    getMy : getMyCourses,
    getTeaching : getTeachingCourses,
    createCourse : createCourse
}