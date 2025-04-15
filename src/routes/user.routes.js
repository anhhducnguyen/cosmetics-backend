const express = require('express');
const router = express.Router();
const Controller = require('../controllers/user.controllers');
const { authorize } = require("../middlewares/auth.middlewares");
const checkUserExistById = require("../middlewares/checkUserExistById");
const { checkEmailExist } = require("../middlewares/checkEmailExist");
const upload = require("../middlewares/upload.single");
const { createUserSchema  } = require("../middlewares/validate-schema");
const validateRequest = require("../middlewares/validateRequest");

router.get(
    '/', 
    authorize(["admin", "seller"]), 
    Controller.getAll
);
router.get(
    '/:id', 
    authorize(["admin", "seller"]), 
    checkUserExistById, 
    Controller.getById
);
router.post(
    '/', 
    authorize(["admin"]),
    validateRequest(createUserSchema), 
    upload.single("avatar"), 
    checkEmailExist, 
    Controller.create
);

router.put(
    '/:id', 
    authorize(["admin"]), 
    checkUserExistById, 
    Controller.update
);
router.delete(
    '/:id', 
    authorize(["admin"]), 
    checkUserExistById, 
    Controller.delete
);

module.exports = router;





























// const express = require('express');
// const router = express.Router();
// const Controller = require('../controllers/user.controllers');
// const { authorize } = require("../middlewares/auth.middlewares");
// const checkUserExistById = require("../middlewares/checkUserExistById");
// const checkEmailExist = require("../middlewares/checkEmailExist");
// const upload = require("../middlewares/upload.single");

// /**
//  * @openapi
//  * components:
//  *   schemas:
//  *     User:
//  *       type: object
//  *       properties:
//  *         id:
//  *           type: string
//  *           example: "123"
//  *         username:
//  *           type: string
//  *           example: "user123"
//  *         email:
//  *           type: string
//  *           example: "user@example.com"
//  *         role:
//  *           type: string
//  *           example: "admin"
//  *     UserInput:
//  *       type: object
//  *       properties:
//  *         username:
//  *           type: string
//  *           example: "newuser"
//  *         email:
//  *           type: string
//  *           format: email
//  *           example: "newuser@example.com"
//  *         password:
//  *           type: string
//  *           format: password
//  *           example: "password123"
//  */

// /**
//  * @openapi
//  * /api/v1/users:
//  *   get:
//  *     tags:
//  *       - Users
//  *     summary: Lấy danh sách tất cả người dùng
//  *     responses:
//  *       200:
//  *         description: Lấy danh sách người dùng thành công
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/User'
//  *       500:
//  *         description: Lỗi máy chủ
//  */
// // router.get('/', authorize(["admin"]), Controller.getAll);
// router.get('/', Controller.getAll);

// /**
//  * @openapi
//  * /api/v1/users/{id}:
//  *   get:
//  *     tags:
//  *       - Users
//  *     summary: Lấy thông tin một người dùng theo ID
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         example: "123"
//  *         schema:
//  *           type: string
//  *         description: ID của người dùng
//  *     responses:
//  *       200:
//  *         description: Lấy người dùng thành công
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/User'
//  *       404:
//  *         description: Không tìm thấy người dùng
//  *       500:
//  *         description: Lỗi máy chủ
//  */
// // router.get('/:id', authorize(["admin"]), checkUserExistById, Controller.getById);
// router.get('/:id', checkUserExistById, Controller.getById);

// /**
//  * @openapi
//  * /api/v1/users:
//  *   post:
//  *     tags:
//  *       - Users
//  *     summary: Tạo mới một người dùng
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/x-www-form-urlencoded:
//  *           schema:
//  *             $ref: '#/components/schemas/UserInput'
//  *     responses:
//  *       201:
//  *         description: Tạo người dùng thành công
//  *       400:
//  *         description: Dữ liệu không hợp lệ
//  *       500:
//  *         description: Lỗi máy chủ
//  */
// // router.post('/', authorize(["admin"]), checkEmailExist, upload.single("avatar"), Controller.create);
// router.post('/', upload.single("avatar"), checkEmailExist, Controller.create);


// /**
//  * @openapi
//  * /api/v1/users/{id}:
//  *   put:
//  *     tags:
//  *       - Users
//  *     summary: Cập nhật thông tin người dùng theo ID
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID của người dùng
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/UserInput'
//  *     responses:
//  *       200:
//  *         description: Cập nhật người dùng thành công
//  *       404:
//  *         description: Không tìm thấy người dùng
//  *       500:
//  *         description: Lỗi máy chủ
//  */
// router.put('/:id', checkUserExistById, Controller.update);

// /**
//  * @openapi
//  * /api/v1/users/{id}:
//  *   delete:
//  *     tags:
//  *       - Users
//  *     summary: Xóa người dùng theo ID
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID của người dùng
//  *     responses:
//  *       200:
//  *         description: Xóa người dùng thành công
//  *       404:
//  *         description: Không tìm thấy người dùng
//  *       500:
//  *         description: Lỗi máy chủ
//  */
// router.delete('/:id', authorize(["admin"]), checkUserExistById, Controller.delete);

// module.exports = router;
