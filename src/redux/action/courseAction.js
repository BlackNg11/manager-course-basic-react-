import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall } from "./apiStatusAction";

export function loadCourseSucces(courses) {
  return {
    type: types.LOAD_COURSE_SUCCESS,
    courses
  };
}

export function createCourseSucces(course) {
  return {
    type: types.CREATE_COURSE_SUCCESS,
    course
  };
}

export function updateCourseSucces(course) {
  return {
    type: types.UPDATE_COURSE_SUCCESS,
    course
  };
}

export function loadCourse() {
  return function(dispatch) {
    dispatch(beginApiCall());
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

export function saveCourse(course) {
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then(saveCourses => {
        course.id
          ? dispatch(updateCourseSucces(saveCourses))
          : dispatch(createCourseSucces(saveCourses));
      })
      .catch(err => {
        throw err;
      });
  };
}
