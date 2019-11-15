import { combineReducers } from "redux";
import { rentalReducer } from "./rental-reducer";
import { authReducer } from "./auth-reducer";

import { reducer as formReducer } from "redux-form";

export default combineReducers({
  rentals: rentalReducer,
  auth: authReducer,
  form: formReducer
});
