import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Main} from "./pages/Main";
import {Login} from "./pages/Login";
import {Registration} from "./pages/Registration";
import {Logout} from "./pages/Logout";
import {Profile} from "./pages/Profile";
import {Groups} from "./pages/Groups";
import {Group} from "./pages/Group";
import {Course} from "./pages/Course";
import {MyCourses} from "./pages/MyCourses";
import {TeachingCourses} from "./pages/TeachingCourses";
import NavbarComponent from "./components/Navbar/NavbarComponent";


function App() {
    return (
        <BrowserRouter>
            <NavbarComponent/>
            <Routes>
                <Route exact path='/registration' element={<Registration/>}/>
                <Route exact path='/login' element={<Login/>}/>
                <Route exact path='/logout' element={<Logout/>}/>
                <Route exact path='/profile' element={<Profile/>}/>
                <Route exact path='/groups' element={<Groups/>}/>
                <Route exact path='/groups/:id' element={<Group/>}/>
                <Route exact path='/courses/:id' element={<Course/>}/>
                <Route exact path='/courses/my' element={<MyCourses/>}/>
                <Route exact path='/courses/teaching' element={<TeachingCourses/>}/>
                <Route exact path="*" element={<Main/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
