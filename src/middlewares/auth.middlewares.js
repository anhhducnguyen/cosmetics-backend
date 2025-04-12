const { registerBody } = require("../config/validate-schema");
const jwt = require("jsonwebtoken");

module.exports.validateBody = function (req, res, next) {
  // email, pass
  let { email, password } = req.body;
  // Kiểm tra tính hợp lệ của email (@.gmail .hotmail....)
  // Kiểm tra tính hợp lệ của password (8 ký tự, chứa cả hoa thường, cả số...);

  let { error } = registerBody.validate({ email, password });
  if (error) {
    res.json(err);
  } else {
    next();
  }
};

module.exports.authorize = function (roles) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({ message: "You are not logged in" });
    }
    // console.log("Current user:", req.user);
    // console.log(roles);
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({
        message: "Forbidden",
      });
    }
  };
};
