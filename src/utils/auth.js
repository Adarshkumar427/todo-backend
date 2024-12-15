const jwt = require("jsonwebtoken");
const { User } = require("../api/users/models");

async function authorize(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: "authorization is required" });
    }
    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "authorization must be Bearer" });
    }
    const token = authorization.substring("Bearer ".length);
    const { id, hash } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (user.password.slice(-10) !== hash) {
      return res.status(401).json({ message: "authorization failed" });
    }
    res.locals.user = user;
    res.locals.token = token;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "authorization failed" });
  }
}

const auth = {
  authorize,
};

module.exports = auth;
