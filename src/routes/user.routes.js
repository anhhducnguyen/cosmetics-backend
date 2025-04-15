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
    // authorize(["admin", "seller"]), 
    Controller.getAll
);
router.get(
    '/:id', 
    // authorize(["admin", "seller"]), 
    checkUserExistById, 
    Controller.getById
);
router.post(
    '/', 
    // authorize(["admin"]),
    // validateRequest(createUserSchema), 
    upload.single("avatar"), 
    checkEmailExist, 
    Controller.create
);

router.put(
    '/:id', 
    // authorize(["admin"]), 
    upload.single("avatar"),
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


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Quản lý người dùng
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Trang hiện tại
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Số bản ghi mỗi trang
 *       - in: query
 *         name: sortBy
 *         schema:
 *           enum: [id, name, email, age]
 *         description: Trường sắp xếp
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Thứ tự sắp xếp
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Lấy chi tiết người dùng
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin người dùng
 *       404:
 *         description: Không tìm thấy người dùng
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Tạo người dùng mới
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nguyễn Văn A
 *               age:
 *                 type: integer
 *                 example: 25
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 example: male
 *               role:
 *                 type: string
 *                 enum: [admin, seller, customer]
 *                 example: user
 *               username:
 *                 type: string
 *                 example: nguyenvana
 *               email:
 *                 type: string
 *                 format: email
 *                 example: nguyenvana@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 12345678
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Người dùng đã được tạo
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Cập nhật người dùng
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nguyễn Văn B
 *               age:
 *                 type: integer
 *                 example: 30
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 example: female
 *               role:
 *                 type: string
 *                 enum: [admin, seller, customer]
 *                 example: seller
 *               username:
 *                 type: string
 *                 example: nguyenvanb
 *               email:
 *                 type: string
 *                 format: email
 *                 example: nguyenvanb@example.com
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy người dùng
 */


/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Xoá người dùng
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xoá thành công
 *       404:
 *         description: Không tìm thấy người dùng
 */






























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
