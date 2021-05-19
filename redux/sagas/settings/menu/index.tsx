import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import { settingMenuTypes } from "../../../types";
import { settingMenuActions } from "../../../actions";
function* settingMenuSaga() {
  try {
    const response = yield call(() =>
      axios.get(
        `https://raw.githubusercontent.com/tminhtri92/chuparty-with-redux-saga-app/master/public/settings/menu.json`
      )
    );
    const data = yield response.data;
    yield put(settingMenuActions.settingMenuLoadDataSuccess(data));
  } catch (err) {
    yield put(settingMenuActions.settingMenuFailure(err));
  }
}

// function* userTestSaga() {
//   yield takeLatest(userTestTypes.LOAD_DATA, loadDataSaga);
// }

export default settingMenuSaga;
