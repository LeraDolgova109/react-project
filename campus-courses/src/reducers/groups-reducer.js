import {groupsApi} from "../Api/groupsApi";

const LOAD_GROUPS = "LOAD_GROUPS";
const CREATE_GROUPS = "CREATE_GROUPS";
const UPDATE_GROUPS = "UPDATE_GROUPS";
const DELETE_GROUPS = "DELETE_GROUPS";
const SET_EDIT_GROUPS = "SET_EDIT_GROUPS";

let initialState = {
    groups : [],
    myCourses : [],
    teachingCourses : [],
    editGroups : {
        id: '',
        groupName: ''
    }
}

const groupsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case LOAD_GROUPS:
            newState.groups = action.groups;
            return newState;
        case SET_EDIT_GROUPS:
            newState.groups = [...state.groups];
            newState.editGroups = {id: action.id, groupName: action.groupName};
            return newState;
        case UPDATE_GROUPS:
            const index = newState.groups.findIndex(group => group.id === action.group.id);
            newState.groups[index] = {id: action.group.id, name: action.group.name};
            return newState;
        case DELETE_GROUPS:
            newState.groups = newState.groups.filter(({id}) => id !== action.id);
            return newState;
        case CREATE_GROUPS:
            newState.groups = [...newState.groups, {id: action.group.id, name: action.group.name}];
            return newState;  
        default:
            return newState;
    }
}

export function loadGroupsActionCreator(groups){
    return {type: LOAD_GROUPS, groups : groups};
}

export function loadGroupsThunkCreator() {
    return (dispatch) => {
        groupsApi.getGroups().then(data => {
            dispatch(loadGroupsActionCreator(data))
        })
    };
}

export function setEditGroupsActionCreator(id, groupName){
    return {type: SET_EDIT_GROUPS, id: id, groupName: groupName}
}

export function updateGroupsActionCreator(group){
    return {type: UPDATE_GROUPS, group: group}
}
export function createGroupsActionCreator(group){
    return {type: CREATE_GROUPS, group: group}
}
export function deleteGroupsActionCreator(id){
    return {type: DELETE_GROUPS, id: id}
}

export function editGroupsThunkCreator(id, groupName){
    return(dispatch) => {
        groupsApi.updateGroup(id, groupName).then(data =>
            dispatch(updateGroupsActionCreator(data))
        );
    }
}

export function deleteGroupsThunkCreator(id){
    return(dispatch) => {
        groupsApi.deleteGroup(id).then(
            dispatch(deleteGroupsActionCreator(id))
        );
    }
}

export function createGroupsThunkCreator(groupName){
    return(dispatch) => {
        groupsApi.createGroup(groupName).then(data =>
            dispatch(createGroupsActionCreator(data))
        );
    }
}

export default groupsReducer;