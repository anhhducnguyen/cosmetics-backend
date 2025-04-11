const db = require("../config/database");
const crypto = require("crypto");
const transporter = require("../config/email");

module.exports.findUser = async (username) => {
    return await db("users").where('username', username).first();
};

module.exports.createAccount = async (username, hashedPassword) => {
    return await db("users").insert({
        username,
        password: hashedPassword
      });
};

module.exports.findEmail = async (email) => {  
    return await db("users").where('email', email).first()
};

module.exports.generateResetToken = async (email) => {
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000;

    await db("users")
        .where({ email })
        .update({ reset_token: resetToken, reset_token_expiry: resetTokenExpiry });

    return resetToken;
};

module.exports.sendResetEmail = async (email, resetLink) => {
    return await transporter.sendMail({
        from: '"Support" <your-email@gmail.com>',
        to: email,
        subject: "Đặt lại mật khẩu",
        html: `<p>Nhấn vào link sau để đặt lại mật khẩu: <a href="${resetLink}">${resetLink}</a></p>`,
    });
};
