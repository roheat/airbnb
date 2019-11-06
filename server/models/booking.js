const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  endAt: {
    type: Date,
    required: "Ending Date is required!"
  },
  startAt: {
    type: Date,
    required: "Starting Date is required!"
  },
  totalPrice: Number,
  days: Number,
  guests: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  rental: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rental"
  }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
