import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";

export function loadAuthorsSucces(authers) {
  return {
    type: types.LOAD_AUTHORS_SUCCESS,
    authers
  };
}

export function loadAuthors() {
  return function(dispatch) {
    return authorApi
      .getAuthors()
      .then(author => {
        dispatch(loadAuthorsSucces(author));
      })
      .catch(err => {
        throw err;
      });
  };
}
