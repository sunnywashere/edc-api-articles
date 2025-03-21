const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../api/users/users.model");

module.exports = async (req, res, next) => { // Passage en async.
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "not token";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);
    const user = await User.findById(decoded.userId).select('-password');
    req.user = user;  // On récupère toutes les données de l'utilisateur.
    next();
  } catch (message) {
    next(new UnauthorizedError(message));
  }
};