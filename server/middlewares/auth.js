const { parseToken, notAuthorized } = require("../helpers/misc");
const { normalizeErrors } = require("../helpers/mongoose");
const User = require("../models/user");

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    const user = parseToken(token);
    User.findById(user.userId, function(err, user) {
      if (err)
        return res.status(422).send({ errors: normalizeErrors(err.errors) });

      if (user) {
        res.locals.user = user;
        next();
      } else {
        return notAuthorized(res);
      }
    });
  } else {
    return notAuthorized(res);
  }
};
