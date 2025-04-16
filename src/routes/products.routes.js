const express = require('express');
const router = express.Router();
const Controller = require('../controllers/products.controller');
const uploadMulti = require("../middlewares/upload");
const { createProductSchema  } = require("../middlewares/validate-schema");
const validateRequest = require("../middlewares/validateRequest");
const queryHandler = require("../middlewares/queryHandler");
const { authorize } = require("../middlewares/auth.middlewares");

router.get(
    '/', 
    // authorize(["admin", "seller", "customer"]), 
    queryHandler,
    Controller.getAll,
);
router.get(
    '/:id', 
    // authorize(["admin", "seller", "customer"]), 
    Controller.getById,
);
router.post(
    "/", 
    authorize(["admin", "seller"]), 
    // validateRequest(createProductSchema), 
    uploadMulti.array("photoList", 3), 
    Controller.create,
);
router.put(
    '/:id', 
    authorize(["admin", "seller"]), 
    // validateRequest(createProductSchema),
    Controller.update
);
router.delete(
    '/:id', 
    authorize(["admin", "seller"]), 
    Controller.delete,
);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API quản lý sản phẩm
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Lấy danh sách sản phẩm
 *     tags: [Products]
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
 *         description: Số lượng sản phẩm mỗi trang
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Trường để sắp xếp
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Thứ tự sắp xếp
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Lấy chi tiết sản phẩm theo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sản phẩm
 *     responses:
 *       200:
 *         description: Trả về thông tin sản phẩm
 *       404:
 *         description: Không tìm thấy sản phẩm
 */

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Tạo mới sản phẩm
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - productLine
 *               - productVendor
 *               - quantityInstock
 *               - price
 *             properties:
 *               productName:
 *                 type: string
 *                 example: Điện thoại XYZ
 *               productLine:
 *                 type: string
 *                 example: 1
 *               productVendor:
 *                 type: string
 *                 example: Công ty ABC
 *               productDescription:
 *                 type: string
 *                 example: Sản phẩm công nghệ mới nhất
 *               quantityInstock:
 *                 type: integer
 *                 example: 100
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 19990000
 *               photoList:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Danh sách ảnh (tối đa 3 ảnh)
 *     responses:
 *       201:
 *         description: Tạo sản phẩm thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Cập nhật sản phẩm theo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sản phẩm cần cập nhật
 *     multipart/form-data:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               productLine:
 *                 type: string
 *               productVendor:
 *                 type: string
 *               productDescription:
 *                 type: string
 *               quantityInstock:
 *                 type: integer
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Cập nhật sản phẩm thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Xoá sản phẩm theo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID sản phẩm cần xoá
 *     responses:
 *       200:
 *         description: Xoá sản phẩm thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 */

