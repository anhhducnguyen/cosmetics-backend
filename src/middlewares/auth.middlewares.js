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

module.exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  
  if (!token) {
      return res.json({ 
          message: 'Access denied, token missing' 
      });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } catch (err) {
      res.json({ 
          message: 'Invalid token' 
      });
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
