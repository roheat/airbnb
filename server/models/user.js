const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    min: [4, "Username is too short, min is 4 characters"],
    max: [32, "Username is too long, max is 32 characters"]
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    required: "Password is required",
    min: [4, "Password is too short, min is 4 characters"],
    max: [32, "Password is too long, max is 32 characters"]
  },
  rentals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rental" }],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }]
});

userSchema.methods.hasSamePassword = function(requestedPassword) {
  const user = this;
  return bcrypt.compareSync(requestedPassword, user.password);
};

userSchema.pre("save", function(next) {
  const user = this;
  bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
