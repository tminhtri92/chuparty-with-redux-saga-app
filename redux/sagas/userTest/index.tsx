import { put, takeLatest, call } from "redux-saga/effects";
import { userTestTypes } from "../../types";
import { userTestAcions } from "../../actions";
function* userTestSaga() {
  try {
    const res = yield fetch("https://jsonplaceholder.typicode.com/users");
    const data = yield res.json();
    yield put(userTestAcions.loadDataSuccess(data));
  } catch (err) {
    yield put(userTestAcions.failure(err));
  }
}

// function* userTestSaga() {
//   yield takeLatest(userTestTypes.LOAD_DATA, loadDataSaga);
// }

export default userTestSaga;
