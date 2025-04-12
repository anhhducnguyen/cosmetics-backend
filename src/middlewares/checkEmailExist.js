const Service  = require("../services/user.services");

const checkEmailExist = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Email is required",
        })
    }

    try {
        const existingUser = await Service.findEmail(email);
        if (existingUser) {
            return res.status(400).json({
                message: '"Username already exists'
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            message: 'Error' + error,
        })
    }
};

module.exports = checkEmailExist;