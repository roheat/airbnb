import axiosService from "services/axios-service";
const axiosInstance = axiosService.getInstance();
export const createBooking = booking => {
  return axiosInstance
    .post("/bookings", booking)
    .then(res => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors));
};
