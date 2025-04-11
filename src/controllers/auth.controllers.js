const bcrypt = require("bcrypt");
const Services = require("../services/auth.services");
const db = require("../config/database");

module.exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    existingUser = await Services.findUser(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Services.createAccount(username, hashedPassword); 

    res.json({ message: "User registered successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie("connect.sid"); 
        res.json({ message: "Logout successful" });
      });
    });
};

module.exports.resetPassword = async (req, res) => {
    try {
      const { email } = req.body;      
      const user = await Services.findEmail(email);
  
      if (!user) {
        return res.status(404).json({ message: "Email không tồn tại" });
      }
      const resetToken = await Services.generateResetToken(email);
  
      const resetLink = `http://localhost:5000/reset-password?token=${resetToken}`;
      await Services.sendResetEmail(email, resetLink);
  
      res.json({ message: "Link đặt lại mật khẩu đã được gửi qua email" });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
    }
};

module.exports.confirmResetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const user = await db("users").where({ reset_token: token }).first();

        if (!user || user.reset_token_expiry < Date.now()) {
            return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
        }

        // Mã hóa mật khẩu mới
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Cập nhật mật khẩu và xóa token
        await db("users")
        .where({ reset_token: token })
        .update({ password: hashedPassword, reset_token: null, reset_token_expiry: null });

        res.json({ message: "Mật khẩu đã được đặt lại thành công" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};