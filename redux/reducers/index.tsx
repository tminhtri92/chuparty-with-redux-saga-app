import { combineReducers } from "redux";
import userTestReducer from "./userTest";
import settingMenuReducer from "./settings/menu";

const appReducer = combineReducers({
  userTest: userTestReducer,
  settingMenu: settingMenuReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
