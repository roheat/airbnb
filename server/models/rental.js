const mongoose = require("mongoose");

const rentalSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    max: [128, "Too long, max is 128 characters"]
  },
  city: {
    type: String,
    required: true,
    lowercase: true
  },
  category: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true,
    min: [4, "Too short, min is 4 characters"]
  },
  image: {
    type: String,
    required: true
  },
  bedrooms: Number,
  shared: Boolean,
  description: {
    type: String,
    required: true
  },
  dailyRate: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }]
});

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;
