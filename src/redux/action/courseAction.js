import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function createCourse(course) {
  return {
    type: types.CREATE_COURSE,
    course
  };
}

export function loadCourseSucces(courses) {
  return {
    type: types.LOAD_COURSE_SUCCESS,
    courses
  };
}

export function loadCourse() {
  return function(dispatch) {
    return courseApi
      .getCourses()
      .then(course => {
        dispatch(loadCourseSucces(course));
      })
      .catch(err => {
        throw err;
      });
  };
}
