const Service = require("../services/user.services");

const checkUserExistById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await Service.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User does not exist",
            })
        }

        req.user = user;

        next(); 
    } catch (error) {
        return res.status(500).json({
            message: "Error" + error
        });
    }
}

module.exports = checkUserExistById;



