const Booking = require("../models/booking");
const Rental = require("../models/rental");
const User = require("../models/user");
const { normalizeErrors } = require("../helpers/mongoose");
const { isValidBooking } = require("../helpers/misc");

exports.createBooking = function(req, res) {
  const { startAt, endAt, totalPrice, guests, days, rental } = req.body;

  const user = res.locals.user;
  const booking = new Booking({ startAt, endAt, totalPrice, guests, days });

  Rental.findById(rental._id)
    .populate("bookings")
    .populate("user")
    .exec(function(err, foundRental) {
      if (err)
        return res.status(422).send({ errors: normalizeErrors(err.errors) });

      if (foundRental.user.id === user.id)
        return res.status(422).send({
          errors: [
            {
              title: "Invalid booking!",
              detail: "Cannot create booking on your own rental!"
            }
          ]
        });

      if (isValidBooking(booking, foundRental)) {
        booking.user = user;
        booking.rental = foundRental;
        foundRental.bookings.push(booking);

        booking.save(function(err) {
          if (err)
            return res
              .status(422)
              .send({ errors: normalizeErrors(err.errors) });

          foundRental.save();
          User.update(
            { _id: user.id },
            { $push: { bookings: booking } },
            function(err) {}
          );
          return res.json({ startAt: booking.startAt, endAt: booking.endAt });
        });
      } else {
        return res.status(422).send({
          errors: [
            {
              title: "Invalid booking!",
              detail: "Choosen dates already taken!"
            }
          ]
        });
      }
    });
};
