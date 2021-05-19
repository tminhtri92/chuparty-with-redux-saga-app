import { settingMenuTypes } from "../../../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  data: null,
};

function settingMenuReducer(state = initialState, action) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload.settingMenu };
    }

    case settingMenuTypes.SETTING_MENU_FAILURE:
      return {
        ...state,
        ...{ error: action.error },
      };

    case settingMenuTypes.SETTING_MENU_LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{ data: action.data },
      };

    default:
      return state;
  }
}

export default settingMenuReducer;
