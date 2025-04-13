// const { resetPassword } = require("../controllers/auth.controllers");
// const Service  = require("../services/user.services");

// const checkEmailExist = async (req, res, next) => {
//     const { email } = req.body;
//     // console.log(email);  
    

//     if (!email) {
//         return res.status(400).json({
//             message: "Email is required",
//         })
//     }

//     try {
//         const existingUser = await Service.findEmail(email);
//         if (existingUser) {
//             return res.status(400).json({
//                 message: "Username already exists"
//             })
//         }
//         next();
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Error' + error,
//         })
//     }
// };

// module.exports = checkEmailExist;

const fs = require("fs");
const path = require("path");
const Service = require("../services/user.services");

const checkEmailExist = async (req, res, next) => {
    const { email } = req.body;

    // Hàm xóa ảnh nếu đã được upload
    const deleteUploadedFile = () => {
        if (req.file && req.file.filename) {
            const filePath = path.join(__dirname, "../public", req.file.filename);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Không thể xóa file:", err.message);
                } else {
                    console.log("Đã xoá file:", req.file.filename);
                }
            });
        }
    };

    if (!email) {
        deleteUploadedFile();
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const existingUser = await Service.findEmail(email);
        if (existingUser) {
            deleteUploadedFile();
            return res.status(400).json({ message: "Email already exists" });
        }

        next();
    } catch (error) {
        deleteUploadedFile();
        return res.status(500).json({ message: "Error: " + error.message });
    }
};

module.exports = checkEmailExist;
