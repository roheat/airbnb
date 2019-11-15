import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "redux/actions/types";

const INITIAL_STATE = {
  isAuth: false,
  errors: []
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isAuth: true, errors: [] };
    case LOGIN_FAILURE:
      return { ...state, isAuth: false, errors: action.payload };
    case LOGOUT:
      return { ...state, isAuth: false, errors: [] };
    default:
      return state;
  }
};
