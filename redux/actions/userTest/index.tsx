import { userTestTypes } from "../../types";

export function failure(error) {
  return {
    type: userTestTypes.FAILURE,
    error,
  };
}

export function loadData() {
  return { type: userTestTypes.LOAD_DATA };
}

export function loadDataSuccess(data) {
  return {
    type: userTestTypes.LOAD_DATA_SUCCESS,
    data,
  };
}
