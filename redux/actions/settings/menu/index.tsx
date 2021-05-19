import { settingMenuTypes } from "../../../types";

export function settingMenuFailure(error) {
  return {
    type: settingMenuTypes.SETTING_MENU_FAILURE,
    error,
  };
}

export function settingMenuLoadData() {
  return { type: settingMenuTypes.SETTING_MENU_LOAD_DATA };
}

export function settingMenuLoadDataSuccess(data) {
  return {
    type: settingMenuTypes.SETTING_MENU_LOAD_DATA_SUCCESS,
    data,
  };
}
