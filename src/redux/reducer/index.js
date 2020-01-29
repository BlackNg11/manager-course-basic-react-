import { combineReducers } from "redux";
import course from "./courseReducer";
import author from "./authorReducer";

const rootReducer = combineReducers({
  course,
  author
});

export default rootReducer;
