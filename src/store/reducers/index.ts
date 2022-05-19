import { combineReducers } from "redux";

import userReducer from "./userReducer";
import postReducer from "./postReducer";

const reducers = combineReducers({
  users: userReducer,
  posts: postReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;