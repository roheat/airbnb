import { combineReducers } from "redux";
import { rentalReducer } from "./rental-reducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  rentals: rentalReducer,
  form: formReducer
});
