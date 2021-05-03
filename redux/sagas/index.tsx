import { all, call, delay, put, take, takeLatest } from "redux-saga/effects";
import { userTestTypes } from "../types";

import userTestSaga from "./userTest";

export default function* rootSaga() {
  yield all([userTestSaga()]);
}
