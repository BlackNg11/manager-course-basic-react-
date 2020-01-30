import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusAction";

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

export function deleteCourseOptimistic(course) {
  return {
    type: types.DELETE_COURSE_OPTIMISTIC,
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
        dispatch(apiCallError(err));
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
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function deleteCourse(course) {
  return function(dispatch) {
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}
