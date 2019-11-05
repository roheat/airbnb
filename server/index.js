const express = require("express");
const mongoose = require("mongoose");
const FakeDb = require("./fake-db");
const bodyParser = require("body-parser");

require("dotenv").config();
const app = express();
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE).then(() => {
  const fakeDb = new FakeDb();
  // fakeDb.seedDb();
});

// Models
const Rental = require("./models/rental");

// Routes
const rentalRoutes = require("./routes/rentals");
const userRoutes = require("./routes/users");

app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", userRoutes);

const PORT = process.env.port || 5000;

app.listen(PORT, function() {
  console.log(`Running on port ${PORT}...`);
});
