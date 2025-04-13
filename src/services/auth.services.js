const db = require("../config/database");
const crypto = require("crypto");
const transporter = require("../config/email");

module.exports.findOne = async (condition) => {
    const result =  await db("users")
            .where(condition) 
            .first();
    return result;
};

module.exports.createUser = async (newUser) => {
    const [userId] = await db("users").insert(newUser).returning("id");
    return userId;
};

module.exports.findById = async (id) => {
    return await db("users").where({ id }).first();
}

module.exports.findUser = async (email) => {
    return await db("users").where('email', email).first();
};

module.exports.createAccount = async (email, hashedPassword) => {
    return await db("users").insert({
        email,
        password: hashedPassword
      });
};

module.exports.findByGoogleId = async (googleId) => {
    return await db("users").where({ google_id: googleId }).first();
}

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
