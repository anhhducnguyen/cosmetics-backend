const express = require('express');
const router = express.Router();
const Controller = require('../controllers/user.controllers');

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Lấy danh sách tất cả người dùng
 *     responses:
 *       200:
 *         description: Lấy danh sách người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Lỗi máy chủ
 */
router.get('/', Controller.getAll);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Lấy thông tin một người dùng theo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Lấy người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Không tìm thấy người dùng
 *       500:
 *         description: Lỗi máy chủ
 */
router.get('/:id', Controller.getById);

/**
 * @openapi
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Tạo mới một người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Tạo người dùng thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi máy chủ
 */
router.post('/', Controller.create);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Cập nhật thông tin người dùng theo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Cập nhật người dùng thành công
 *       404:
 *         description: Không tìm thấy người dùng
 *       500:
 *         description: Lỗi máy chủ
 */
router.put('/:id', Controller.update);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Xóa người dùng theo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Xóa người dùng thành công
 *       404:
 *         description: Không tìm thấy người dùng
 *       500:
 *         description: Lỗi máy chủ
 */
router.delete('/:id', Controller.delete);


module.exports = router;
