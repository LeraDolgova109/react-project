import {createStore, combineReducers, applyMiddleware} from 'redux';
import profileReducer from "../reducers/profile-reducer";
import groupsReducer from "../reducers/groups-reducer";
import groupReducer from "../reducers/group-reducer";
import coursesReducer from "../reducers/courses-reducer";
import thunk from 'redux-thunk';

let reducers = combineReducers({
    profile : profileReducer,
    groups : groupsReducer,
    courses : coursesReducer,
    group : groupReducer
})

let store = createStore(reducers, applyMiddleware(thunk));

export default store;