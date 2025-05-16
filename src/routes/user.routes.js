const express = require('express');
const router = express.Router();
const Controller = require('../controllers/user.controllers');
const { authorize } = require("../middlewares/auth.middlewares");
const checkUserExistById = require("../middlewares/checkUserExistById");
const { checkEmailExist } = require("../middlewares/checkEmailExist");
const upload = require("../middlewares/upload.single");
const { createUserSchema  } = require("../middlewares/validate-schema");
const validateRequest = require("../middlewares/validateRequest");
const verifyToken = require('../middlewares/verifyToken');

router.get(
    '/', 
    authorize(["admin", "seller"]), 
    verifyToken,
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
    // validateRequest(createUserSchema), 
    upload.single("avatar"), 
    checkEmailExist, 
    Controller.create
);

router.put(
    '/:id', 
    authorize(["admin"]), 
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
