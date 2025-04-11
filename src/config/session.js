const session = require("express-session");

const sessionMiddleware = session({
  secret: "your-secret-key", // Bạn có thể dùng dotenv để bảo mật
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // false khi dev (không dùng HTTPS)
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 ngày
  }
});

module.exports = sessionMiddleware;
