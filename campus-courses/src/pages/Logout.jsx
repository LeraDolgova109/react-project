import React from 'react'
import postLogout from "../Api/logoutApi";
import '../App.css';

const Logout = () => {
    postLogout();
}

export {Logout}