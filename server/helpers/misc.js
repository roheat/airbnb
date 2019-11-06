const jwt = require("jsonwebtoken");
const moment = require("moment");

exports.parseToken = function(token) {
  const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET);

  return decoded;
};

exports.notAuthorized = function(res) {
  return res.status(401).send({
    errors: [{ title: "Not authorized!", detail: "You have to login!" }]
  });
};

exports.isValidBooking = function(propsedBooking, rental) {
  const { startAt, endAt } = propsedBooking;
  let isValid = true;
  if (rental.bookings && rental.bookings.length) {
    isValid = rental.bookings.every(booking => {
      return (
        (moment(booking.startAt) < moment(startAt) &&
          moment(booking.endAt) < moment(startAt)) ||
        (moment(endAt) < moment(booking.startAt) &&
          moment(endAt) < moment(booking.endAt))
      );
    });
  }

  return isValid;
};
