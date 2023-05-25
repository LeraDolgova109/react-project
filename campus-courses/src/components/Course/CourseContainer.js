import React from 'react';
import CourseDetail from "./CourseDetail";
import ToastItem from "../Toast/ToastItem";

class CourseContainer extends React.Component {
    render() {
        if (this.props.courses.coursesInfo === 401) {
            return <ToastItem
                message="Необходимо авторизоваться"
                error={401}
            />;
        }
        if (this.props.courses.coursesInfo === 400) {
            return <ToastItem
                message="Произошла ошибка"
                error={400}
            />;
        }
        if (this.props.courses.coursesInfo === 404) {
            return <ToastItem
                message="Курса с таким id не существует"
                error={404}
            />;
        }
        if (this.props.courses.coursesInfo.teachers && this.props.courses.coursesInfo.teachers.find(x => x.email === this.props.profile.user.info.email)) {
            this.props.courses.isTeacher = true;
            if (this.props.courses.coursesInfo.teachers.find(x => x.email === this.props.profile.user.info.email).isMain) {
                this.props.courses.isMainTeacher = true;
            }
        }
        if (this.props.group.myCourses.find(x => x.id === this.props.id)) {
            this.props.courses.isStudent = true;
        }
        return (
            <div>
                <CourseDetail {...this.props}/>
            </div>
        )
    }
}

export default CourseContainer;