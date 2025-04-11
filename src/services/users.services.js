const db = require("../config/database");

module.exports.getAll = async () => {
    return await db("users").select("*");
};
module.exports.getById = async (id) => {
    return db("users")
        .where("id", id)
        .first();
};
module.exports.createOne = async (name, email, age, gender) => {
    return await db("users").insert({
        name: name,
        email: email,
        age: age,
        gender: gender,
    });
};
module.exports.delete = async (id) => {
    return await db("users")
        .where("id", id)
        .del();
};
module.exports.updateById = async (id, name, email, age, gender) => {   
    return await db("users")
        .where("id", id)
        .update({
            name: name,
            email: email,
            age: age,
            gender: gender,
       });
};
module.exports.findOne = async (condition) => {
    // console.log(condition);
    
    const result =  await db("users")
            .where(condition) 
            .first();
            // console.log(result);
            
    return result;
};
module.exports.sendResetEmail = async (email, resetLink) => {
    return await transporter.sendMail({
        from: '"Support" <your-email@gmail.com>',
        to: email,
        subject: "Đặt lại mật khẩu",
        html: `<p>Nhấn vào link sau để đặt lại mật khẩu: <a href="${resetLink}">${resetLink}</a></p>`,
    });
};
