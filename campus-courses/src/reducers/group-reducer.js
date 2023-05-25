import {groupApi} from "../Api/groupApi";

const LOAD_GROUP = "LOAD_GROUP";
const LOAD_MY = "LOAD_MY";
const LOAD_TEACHING = "LOAD_TEACHING";
const CREATE_COURSE = "CREATE_COURSE";


let initialState = {
    group: [],
    myCourses : [],
    teachingCourses : []
}

const groupsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case LOAD_GROUP:
            newState.group = action.group;
            return newState;
        case LOAD_MY:
            newState.myCourses = action.myCourses;
            return newState;
        case LOAD_TEACHING:
            newState.teachingCourses = action.teachingCourses;
            return newState;
        case CREATE_COURSE:
            newState.group = action.courses;
            return newState;    
        default:
            return newState;
    }
}

export function loadGroupActionCreator(group){
    return {type: LOAD_GROUP, group : group};
}

export function loadMyCoursesActionCreator(courses){
    return {type: LOAD_MY, myCourses : courses};
}

export function loadTeachingCoursesActionCreator(courses){
    return {type: LOAD_TEACHING, teachingCourses : courses};
}

export function loadGroupThunkCreator(id) {
    return (dispatch) => {
        groupApi.getGroup(id).then(data => {
            dispatch(loadGroupActionCreator(data))
        })
        groupApi.getMy().then(data => {
            dispatch(loadMyCoursesActionCreator(data))
        })
        groupApi.getTeaching().then(data => {
            dispatch(loadTeachingCoursesActionCreator(data))
        })
    };
}

export function loadMyGroupThunkCreator() {
    return (dispatch) => {
        groupApi.getMy().then(data => {
            dispatch(loadMyCoursesActionCreator(data))
        })
        groupApi.getTeaching().then(data => {
            dispatch(loadTeachingCoursesActionCreator(data))
        })
    };
}

export function createCourseActionCreator(courses){
    return {type: CREATE_COURSE, courses: courses}
}

export function createCourseThunkCreator(courseInfo, groupID){
    return(dispatch) => {
        groupApi.createCourse(courseInfo, groupID).then(data =>
            dispatch(createCourseActionCreator(data))
        );
    }
}


export default groupsReducer;