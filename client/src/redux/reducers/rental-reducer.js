import {
  FETCH_RENTALS,
  FETCH_RENTAL_BY_ID_START,
  FETCH_RENTAL_BY_ID_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
  data: [],
  rental: {}
};

export const rentalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_RENTALS:
      return { ...state, data: action.payload };
    case FETCH_RENTAL_BY_ID_START:
      return { ...state, rental: {} };
    case FETCH_RENTAL_BY_ID_SUCCESS:
      return { ...state, rental: action.payload };
    default:
      return state;
  }
};
