const jwt = require("jsonwebtoken");

exports.parseToken = function(token) {
  const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET);

  return decoded;
};

exports.notAuthorized = function(res) {
  return res.status(401).send({
    errors: [{ title: "Not authorized!", detail: "You have to login!" }]
  });
};
