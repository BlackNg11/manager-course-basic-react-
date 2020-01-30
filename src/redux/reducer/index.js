import { combineReducers } from "redux";
import course from "./courseReducer";
import author from "./authorReducer";
import apiStatusReducer from "./apiStatusReducer";

const rootReducer = combineReducers({
  course,
  author,
  apiStatusReducer
});

export default rootReducer;
