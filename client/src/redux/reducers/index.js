import { combineReducers } from "redux";
import { rentalReducer } from "./rental-reducer";

export default combineReducers({
  rentals: rentalReducer
});
