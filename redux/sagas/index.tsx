import { all } from "redux-saga/effects";

import userTestSaga from "./userTest";
import settingMenuSaga from "./settings/menu";

export default function* rootSaga() {
  yield all([userTestSaga(), settingMenuSaga()]);
}
