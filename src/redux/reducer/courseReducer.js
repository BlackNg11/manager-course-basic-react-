import * as types from "../action/actionTypes";
import intialState from "./intialState";

export default function courseReducer(state = intialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      return [...state, { ...action.course }];
    case types.LOAD_COURSE_SUCCESS:
      return action.courses;
    default:
      return state;
  }
}
