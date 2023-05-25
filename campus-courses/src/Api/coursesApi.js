import Axios from "axios";
import swal from 'sweetalert';

const baseUrl = 'https://camp-courses.api.kreosoft.space/';

function getCourse(id){
    let token = localStorage.getItem('token');

    return Axios.get(baseUrl+'courses/' + id + '/details', {
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

function postSignUp(id){
    let token = localStorage.getItem('token');

    return Axios.post(baseUrl+'courses/' + id + '/sign-up', {},{
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then(response => {
        if (response.status === 200)
        {
            return response.data;
        }
    })
        .catch(error => {
            swal('Ошибка', 'Произошла ошибка', 'error');
            return error.response.status
        });
}

function postStudentStatus(id, studentId, status){
    let token = localStorage.getItem('token');

    return Axios.post(baseUrl+'courses/' + id + '/student-status/' + studentId,
    {
            'status': status
        },{
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then(response => {
        if (response.status === 200)
        {
            swal('Успех!', 'Статус студентат изменен!', 'success');
            return response.data
        }
    })
        .catch(error => {
            swal('Ошибка', 'Произошла ошибка', 'error');
            return error.response.status
        });
}

function putCourse(id, data){
    let token = localStorage.getItem('token');

    return Axios.put(baseUrl+'courses/' + id,
    {
        "requirements": data.requirements,
        "annotations": data.annotations
    },
     {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then(response => {
        if (response.status === 200)
        {
            swal('Успех!', 'Данные курса изменены!', 'success');
            return response.data
        }
    })
        .catch(error => {
            swal('Ошибка', 'Произошла ошибка', 'error');
            return error.response.status
        });
}

function postStatus(id, data){
    let token = localStorage.getItem('token');

    return Axios.post(baseUrl+'courses/' + id + "/status",
    {
        "status": data
    },
     {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then(response => {
        if (response.status === 200)
        {
            swal('Успех!', 'Статус курса изменен!', 'success');
            return response.data
        }
    })
        .catch(error => {
            swal('Ошибка', 'Произошла ошибка', 'error');
            return error.response.status
        });
}

function postNotifications(id, text, isImportant){
    let token = localStorage.getItem('token');

    return Axios.post(baseUrl+'courses/' + id + "/notifications",
    {
        "text": text,
        "isImportant": isImportant
    },
     {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then(response => {
        if (response.status === 200)
        {
            swal('Успех!', 'Уведомление создано!', 'success');
            return response.data
        }
    })
        .catch(error => {
            swal('Ошибка', 'Произошла ошибка', 'error');
            return error.response.status
        });
}

function postTeachers(id, teacherID){
    let token = localStorage.getItem('token');

    return Axios.post(baseUrl+'courses/' + id + "/teachers",
    {
        "userID": teacherID
    },
     {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then(response => {
        if (response.status === 200)
        {
            swal('Успех!', 'Преподаватель добавлен!', 'success');
            return response.data
        }
    })
        .catch(error => {
            swal('Ошибка', 'Данный пользователь является студентом', 'error');
            return error.response.status
        });
}

function postMark(id, studentID, data){
    let token = localStorage.getItem('token');
    
    return Axios.post(baseUrl+'courses/' + id + "/marks/" + studentID,
    {
        "markType": data.markType,
        "mark": data.mark
    },
     {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then(response => {
        if (response.status === 200)
        {
            swal('Успех!', 'Оценка студенту поставлена!', 'success');
            return response.data
        }
    })
        .catch(error => {
            swal('Ошибка', 'Произошла ошибка', 'error');
            return error.response.status
        });
}

function deleteCourse(id){
    let token = localStorage.getItem('token');
    
    return Axios.delete(baseUrl+'courses/' + id,{
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then(response => {
        if (response.status === 200)
        {
            swal('Успех!', 'Курс удален!', 'success');
            return response.data
        }
    })
        .catch(error => {
            swal('Ошибка', 'Произошла ошибка', 'error');
            return error.response.status
        });
}

export const coursesApi = {
    getCourse : getCourse,
    postSignUp : postSignUp,
    postStudentStatus : postStudentStatus,
    putCourse : putCourse,
    postStatus : postStatus,
    postNotifications : postNotifications,
    postTeachers : postTeachers,
    postMark : postMark,
    deleteCourse : deleteCourse
}