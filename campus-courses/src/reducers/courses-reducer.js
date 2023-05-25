import {coursesApi} from "../Api/coursesApi";
import {loadMyGroupThunkCreator} from "./group-reducer";

const LOAD_COURSE = "LOAD_COURSE";
const SET_INFO_COURSE = "SET_INFO_COURSE";
const SET_STATUS_COURSE = "SET_STATUS_COURSE";
const SET_STATUS_STUDENT = "SET_STATUS_STUDENT";
const SET_NOTIFICATIONS_COURSE = "SET_NOTIFICATIONS_COURSE";
const SET_TEACHERS_COURSE = "SET_TEACHERS_COURSE";
const SET_MARK_COURSE = "SET_MARK_COURSE";
const DELETE_COURSE = "DELETE_COURSE";

let initialState = {
    coursesInfo : {
        requirements: "<p> </p>",
        annotations: "<p> </p>"
    },
    isTeacher : false,
    isMainTeacher : false,
    isStudent : false
}

const coursesReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case LOAD_COURSE:
            newState.coursesInfo = action.coursesInfo;
            return newState;
        case SET_INFO_COURSE:
            newState.coursesInfo = action.coursesInfo;
            return newState;
        case SET_STATUS_COURSE:
            newState.coursesInfo = action.coursesInfo;
            return newState;
        case SET_STATUS_STUDENT:
            newState.coursesInfo = action.coursesInfo;
            return newState;
        case SET_NOTIFICATIONS_COURSE:
            newState.coursesInfo = action.coursesInfo;
            return newState;
        case SET_TEACHERS_COURSE:
            newState.coursesInfo = action.coursesInfo;
            return newState;
        case SET_MARK_COURSE:
            newState.coursesInfo = action.coursesInfo;
            return newState;
        case DELETE_COURSE:
            window.location.href=("/groups");
            return newState;
        default:
            return newState;
    }
}

export function loadCoursesActionCreator(courses){
    return {type: LOAD_COURSE, coursesInfo : courses};
}

export function setCourseInfoActionCreator(courses){
    return {type: SET_INFO_COURSE, coursesInfo : courses};
}

export function setCourseStatusActionCreator(courses){
    return {type: SET_STATUS_COURSE, coursesInfo : courses};
}

export function setNotificationsActionCreator(courses){
    return {type: SET_NOTIFICATIONS_COURSE, coursesInfo : courses};
}

export function setTeachersActionCreator(courses){
    return {type: SET_TEACHERS_COURSE, coursesInfo : courses};
}

export function setMarkActionCreator(courses){
    return {type: SET_MARK_COURSE, coursesInfo : courses};
}

export function deleteCoursesActionCreator(id){
    return {type: DELETE_COURSE, id : id};
}

export function loadCoursesThunkCreator(id) {
    return (dispatch) => {
        coursesApi.getCourse(id).then(data => {
            dispatch(loadCoursesActionCreator(data))
        })
    };
}

export function setCourseInfoThunkCreator(id, data) {
    return (dispatch) => {
        coursesApi.putCourse(id, data).then(data => {
            dispatch(setCourseInfoActionCreator(data))
        })
    };
}

export function setCourseStatusThunkCreator(id, data) {
    return (dispatch) => {
        coursesApi.postStatus(id, data).then(data => {
            dispatch(setCourseStatusActionCreator(data))
        })
    };
}

export function setStudentStatusThunkCreator(id, studentId, status) {
    return (dispatch) => {
        coursesApi.postStudentStatus(id, studentId, status).then(data => {
            dispatch(setCourseStatusActionCreator(data))
        })
    };
}

export function setNotificationThunkCreator(id, text, isImportant) {
    return (dispatch) => {
        coursesApi.postNotifications(id, text, isImportant).then(data => {
            dispatch(setNotificationsActionCreator(data))
        })
    };
}

export function setTeacherThunkCreator(id, teacherID) {
    return (dispatch) => {
        coursesApi.postTeachers(id, teacherID).then(data => {
            dispatch(setTeachersActionCreator(data))
        })
    };
}

export function setMarkThunkCreator(id, studentID, data) {
    return (dispatch) => {
        coursesApi.postMark(id, studentID, data).then(data => {
            dispatch(setMarkActionCreator(data))
        })
    };
}

export function deleteCourseThunkCreator(id) {
    return (dispatch) => {
        coursesApi.deleteCourse(id).then(data => {
            dispatch(deleteCoursesActionCreator(data))
        })
    };
}

export function signUpThunkCreator(id) {
    return (dispatch) => {
        coursesApi.postSignUp(id).then(data => {
            dispatch(loadMyGroupThunkCreator(data))
        })
    };
}
export default coursesReducer;