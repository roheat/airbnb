const User = require("../models/user");
const { normalizeErrors } = require("../helpers/mongoose");
const jwt = require("jsonwebtoken");

exports.auth = function(req, res) {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(422).send({
      errors: [
        { title: "Data missing!", detail: "Provide both email and password!" }
      ]
    });
  }

  User.findOne({ email }, function(err, user) {
    if (err)
      return res.status(422).send({ errors: normalizeErrors(err.errors) });

    if (!user)
      return res.status(422).send({
        errors: [{ title: "User not found!", detail: "User doesn't exist!" }]
      });

    if (user.hasSamePassword(password)) {
      // return JWT
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username
        },
        process.env.SECRET,
        { expiresIn: "1hr" }
      );
      return res.json(token);
    } else {
      return res.status(422).send({
        errors: [
          { title: "Incorrect password!", detail: "Password is incorrect!" }
        ]
      });
    }
  });
};

exports.register = function(req, res) {
  const { username, email, password, passwordConfirmation } = req.body;

  if (!password || !email) {
    return res.status(422).send({
      errors: [
        { title: "Data missing!", detail: "Provide both email and password!" }
      ]
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({
      errors: [{ title: "Invalid password!", detail: "Passwords don't match!" }]
    });
  }

  User.findOne({ email }, function(err, existingUser) {
    if (err)
      return res.status(422).send({ errors: normalizeErrors(err.errors) });

    if (existingUser) {
      return res.status(422).send({
        errors: [{ title: "Invalid email!", detail: "Email already exists!" }]
      });
    }

    const user = new User({
      username,
      email,
      password
    });

    user.save(function(err) {
      if (err)
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      return res.json({ registered: true });
    });
  });
  // return res.json({ username, email });
};
