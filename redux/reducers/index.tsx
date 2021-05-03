import { combineReducers } from "redux";
import userTestReducer from "./userTest";

const appReducer = combineReducers({
  userTest: userTestReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
