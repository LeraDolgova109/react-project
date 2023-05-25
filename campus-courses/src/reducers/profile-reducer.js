import {profileApi} from "../Api/profileApi";
import {usersApi} from "../Api/usersApi";
import postLogin from "../Api/loginApi";
import postRegistration from "../Api/registrationApi";

const LOAD_PROFILE = "LOAD_PROFILE";
const LOAD_ROLES = "LOAD_ROLES";
const LOAD_USERS = "LOAD_USERS";
const EDIT_PROFILE = "EDIT_PROFILE";
const SET_REG_VALIDATION = "SET_REG_VALIDATION";

let initialState = {
    user : {
        info: {
            fullName: "",
            email: "",
            birthDate: ""
        },
        roles: {
            "isTeacher": false,
            "isStudent": false,
            "isAdmin": false
        }
    },
    users : [],
    validation: {}
}

const profileReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case LOAD_PROFILE:
            newState.user.info = action.user;
            return newState;
        case LOAD_ROLES:
            newState.user.roles = action.user;
            return newState;
        case EDIT_PROFILE:
            newState.user.info = action.user;
            return newState;
        case LOAD_USERS:
            newState.users = action.users;
            return newState;
        case SET_REG_VALIDATION:
            newState.validation = action.error;
            return newState;
        default:
            return newState;
    }
}

export function loadProfileActionCreator(user){
    return {type: LOAD_PROFILE, user: user};
}

export function loadRolesActionCreator(user) {
    return {type: LOAD_ROLES, user: user};
}

export function editProfileActionCreator(user){
    return {type: EDIT_PROFILE, user: user};
}

export function loadUsersActionCreator(users) {
    return {type: LOAD_USERS, users: users};
}

export function setRegValidation(error) {
    return {type: SET_REG_VALIDATION, error: error};
}
export function loadProfileThunkCreator() {
    return (dispatch) => {
        profileApi.getProfile().then(data => {
            dispatch(loadProfileActionCreator(data))
        })
        profileApi.getRoles().then(data => {
            dispatch(loadRolesActionCreator(data))
        })
    };
}

export function loadUsersThunkCreator() {
    return (dispatch) => {
        usersApi.getUsers().then(data => {
            dispatch(loadUsersActionCreator(data))
        })
    };
}
export function editProfileThunkCreator(data) {
    return (dispatch) => {
        profileApi.putProfile(data.fullName, data.birthDate).then(data => {
            dispatch(editProfileActionCreator(data))
        })
    };
}

export function loginThunkCreator(email, password) {
    return (dispatch) => {
        postLogin(email, password).then()
    };
}

export function regThunkCreator(data) {
    return (dispatch) => {
        postRegistration(data).then(data => {
            dispatch(setRegValidation(data));
        })
    };
}
export default profileReducer;