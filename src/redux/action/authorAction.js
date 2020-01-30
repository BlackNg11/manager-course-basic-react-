import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusAction";

export function loadAuthorsSucces(authers) {
  return {
    type: types.LOAD_AUTHORS_SUCCESS,
    authers
  };
}

export function loadAuthors() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then(author => {
        dispatch(loadAuthorsSucces(author));
      })
      .catch(err => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}
