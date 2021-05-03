import { userTestTypes } from "../../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  data: null,
};

function userTestReducer(state = initialState, action) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload.userTest };
    }

    case userTestTypes.FAILURE:
      return {
        ...state,
        ...{ error: action.error },
      };

    case userTestTypes.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{ data: action.data },
      };

    default:
      return state;
  }
}

export default userTestReducer;
