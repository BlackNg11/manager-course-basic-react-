import * as types from "../action/actionTypes";
import intialState from "./intialState";

export default function authorReducer(state = intialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authers;
    default:
      return state;
  }
}
