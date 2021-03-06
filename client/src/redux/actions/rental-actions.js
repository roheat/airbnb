import axios from "axios";
import axiosService from "services/axios-service";
import {
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTAL_BY_ID_START,
  FETCH_RENTAL_BY_ID_SUCCESS
} from "./types";

const axiosInstance = axiosService.getInstance();

export const fetchRentals = () => {
  return dispatch => {
    axiosInstance
      .get(`/rentals`)
      .then(res => res.data)
      .then(rentals => dispatch(fetchRentalsSuccess(rentals)));
  };
};

const fetchRentalsSuccess = rentals => {
  return {
    type: FETCH_RENTALS_SUCCESS,
    payload: rentals
  };
};

const fetchRentalByIdStart = () => {
  return {
    type: FETCH_RENTAL_BY_ID_START
  };
};

const fetchRentalByIdSuccess = rental => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    payload: rental
  };
};

export const fetchRentalById = rentalId => {
  return function(dispatch) {
    dispatch(fetchRentalByIdStart());

    axios
      .get(`/api/v1/rentals/${rentalId}`)
      .then(res => res.data)
      .then(rental => dispatch(fetchRentalByIdSuccess(rental)));
  };
};
