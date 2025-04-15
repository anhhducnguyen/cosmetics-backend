const express = require("express");
const passport = require("passport");
const router = express.Router();
const controller = require("../controllers/auth.controllers");
const { checkEmailExist } = require("../middlewares/checkEmailExist");
const { registerUserSchema } = require("../middlewares/validate-schema");
const validateRequest = require("../middlewares/validateRequest");

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Đăng ký tài khoản người dùng bằng email và mật khẩu
 *     description: Người dùng có thể đăng ký tài khoản bằng cách cung cấp địa chỉ email hợp lệ và mật khẩu.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Địa chỉ email để đăng ký
 *                 example: anhnguyen2k373@gmail.com
 *               password:
 *                 type: string
 *                 description: Mật khẩu để đăng ký tài khoản
 *                 example: 123
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Register successful
 *       400:
 *         description: Dữ liệu không hợp lệ (email đã tồn tại, thiếu trường...)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email already exists
 *       500:
 *         description: Lỗi máy chủ nội bộ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post(
  "/register", 
  validateRequest(registerUserSchema), 
  checkEmailExist, 
  controller.register
);
/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Đăng nhập người dùng bằng email và mật khẩu
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: anhnguyen2k373@gmail.com
 *                 description: Địa chỉ email đã đăng ký
 *               password:
 *                 type: string
 *                 example: 123
 *                 description: Mật khẩu tương ứng với email
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *       401:
 *         description: Sai email hoặc mật khẩu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: Incorrect password
 *       500:
 *         description: Lỗi server
 */
router.post("/login", 
  passport.authenticate("local", {
    successRedirect: "/auth/success",
    failureRedirect: "/auth/fail"
  })
);  
/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Đăng xuất người dùng
 *     description: Hủy phiên làm việc hiện tại của người dùng và xóa cookie phiên.
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout successful
 *       500:
 *         description: Lỗi máy chủ khi đăng xuất
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout failed
 */
router.post("/logout", controller.logout);
/**
 * @openapi
 * /auth/reset-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Gửi link đặt lại mật khẩu qua email
 *     description: Người dùng nhập email để nhận link đặt lại mật khẩu.
 *     multipart/form-data:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email đã đăng ký tài khoản
 *                 example: anhnguyen2k373@gmail.com
 *     responses:
 *       200:
 *         description: Link đặt lại mật khẩu đã được gửi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Link đặt lại mật khẩu đã được gửi qua email
 *       404:
 *         description: Email không tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email không tồn tại
 *       500:
 *         description: Lỗi máy chủ
 */
router.post(
  "/reset-password", 
  validateRequest(registerUserSchema), 
  controller.resetPassword
);
router.post("/reset-password/confirm", controller.confirmResetPassword);
router.get("/success", (req, res) => {
  res.json({ message: "Login successful", user: req.user });
});
router.get("/fail", (req, res) => {
  res.status(401).json({ message: "Login failed" });
}); 
/**
 * @openapi
 * /auth/google:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Bắt đầu xác thực người dùng với Google OAuth2
 *     description: Chuyển hướng người dùng đến trang đăng nhập Google để xác thực qua OAuth2.
 *     responses:
 *       302:
 *         description: Chuyển hướng đến trang đăng nhập Google
 */
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google", 
  passport.authenticate(
    "google", 
    { scope: ["profile", "email"] }
  )
);
/**
 * @openapi
 * /auth/google/callback:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Xử lý callback từ Google sau khi xác thực
 *     description: Nếu xác thực thành công sẽ chuyển hướng đến `/auth/success`, nếu thất bại sẽ chuyển hướng đến `/auth/fail`.
 *     responses:
 *       302:
 *         description: Chuyển hướng đến `/auth/success` hoặc `/auth/fail` tùy theo kết quả xác thực
 */ 
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/auth/fail" }),
    (req, res) => {
      res.redirect("/auth/success");
    }
);

module.exports = router;


















// const express = require("express");
// const passport = require("passport");
// const router = express.Router();
// const controller = require("../controllers/auth.controllers");
// const checkEmailExist = require("../middlewares/checkEmailExist");
// const { registerBody } = require("../middlewares/authSchema");
// const validateRequest = require("../middlewares/validateRequest");

// /**
//  * @openapi
//  * /auth/register:
//  *   post:
//  *     tags:
//  *       - Authentication
//  *     summary: Đăng ký tài khoản người dùng bằng email và mật khẩu
//  *     description: Người dùng có thể đăng ký tài khoản bằng cách cung cấp địa chỉ email hợp lệ và mật khẩu.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/x-www-form-urlencoded:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 description: Địa chỉ email để đăng ký
//  *                 example: anhnguyen2k373@gmail.com
//  *               password:
//  *                 type: string
//  *                 description: Mật khẩu để đăng ký tài khoản
//  *                 example: 123
//  *     responses:
//  *       201:
//  *         description: Đăng ký thành công
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: Register successful
//  *       400:
//  *         description: Dữ liệu không hợp lệ (email đã tồn tại, thiếu trường...)
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: Email already exists
//  *       500:
//  *         description: Lỗi máy chủ nội bộ
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: Internal server error
//  */
// router.post("/register", validateRequest(registerBody), checkEmailExist, controller.register);
// /**
//  * @openapi
//  * /auth/logout:
//  *   post:
//  *     tags:
//  *       - Authentication
//  *     summary: Đăng xuất người dùng
//  *     description: Hủy phiên làm việc hiện tại của người dùng và xóa cookie phiên.
//  *     responses:
//  *       200:
//  *         description: Đăng xuất thành công
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: Logout successful
//  *       500:
//  *         description: Lỗi máy chủ khi đăng xuất
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: Logout failed
//  */
// router.post("/logout", controller.logout);
// /**
//  * @openapi
//  * /auth/reset-password:
//  *   post:
//  *     tags:
//  *       - Authentication
//  *     summary: Gửi link đặt lại mật khẩu qua email
//  *     description: Người dùng nhập email để nhận link đặt lại mật khẩu.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 description: Email đã đăng ký tài khoản
//  *                 example: anhnguyen2k373@gmail.com
//  *     responses:
//  *       200:
//  *         description: Link đặt lại mật khẩu đã được gửi
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: Link đặt lại mật khẩu đã được gửi qua email
//  *       404:
//  *         description: Email không tồn tại
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: Email không tồn tại
//  *       500:
//  *         description: Lỗi máy chủ
//  */
// router.post("/reset-password", controller.resetPassword);
// /**
//  * @openapi
//  * /auth/reset-password/confirm:
//  *   post:
//  *     tags:
//  *       - Authentication
//  *     summary: Xác nhận và cập nhật mật khẩu mới
//  *     description: Người dùng nhập token và mật khẩu mới để hoàn tất quá trình đặt lại.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - token
//  *               - newPassword
//  *             properties:
//  *               token:
//  *                 type: string
//  *                 description: Token được gửi qua email
//  *                 example: abc123xyz
//  *               newPassword:
//  *                 type: string
//  *                 description: Mật khẩu mới
//  *                 example: NewSecurePassword123
//  *     responses:
//  *       200:
//  *         description: Đặt lại mật khẩu thành công
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: Mật khẩu đã được đặt lại thành công
//  *       400:
//  *         description: Token không hợp lệ hoặc đã hết hạn
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: Token không hợp lệ hoặc đã hết hạn
//  *       500:
//  *         description: Lỗi máy chủ
//  */
// router.post("/reset-password/confirm", controller.confirmResetPassword);

// /**
//  * @openapi
//  * /auth/login:
//  *   post:
//  *     tags:
//  *       - Authentication
//  *     summary: Đăng nhập người dùng bằng email và mật khẩu
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/x-www-form-urlencoded:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: anhnguyen2k373@gmail.com
//  *                 description: Địa chỉ email đã đăng ký
//  *               password:
//  *                 type: string
//  *                 example: 123
//  *                 description: Mật khẩu tương ứng với email
//  *     responses:
//  *       200:
//  *         description: Đăng nhập thành công
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: Login successful
//  *       401:
//  *         description: Sai email hoặc mật khẩu
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message: 
//  *                   type: string
//  *                   example: Incorrect password
//  *       500:
//  *         description: Lỗi server
//  */
// router.post("/login", validateRequest(registerBody), passport.authenticate("local", {
//     successRedirect: "/auth/success",
//     failureRedirect: "/auth/fail"
// }));  
// router.get("/success", (req, res) => {
//   res.json({ message: "Login successful", user: req.user });
// });
// router.get("/fail", (req, res) => {
//   res.status(401).json({ message: "Login failed" });
// });  

// /**
//  * @openapi
//  * /auth/google:
//  *   get:
//  *     tags:
//  *       - Authentication
//  *     summary: Bắt đầu xác thực người dùng với Google OAuth2
//  *     description: Chuyển hướng người dùng đến trang đăng nhập Google để xác thực qua OAuth2.
//  *     responses:
//  *       302:
//  *         description: Chuyển hướng đến trang đăng nhập Google
//  */
// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// /**
//  * @openapi
//  * /auth/google/callback:
//  *   get:
//  *     tags:
//  *       - Authentication
//  *     summary: Xử lý callback từ Google sau khi xác thực
//  *     description: Nếu xác thực thành công sẽ chuyển hướng đến `/auth/success`, nếu thất bại sẽ chuyển hướng đến `/auth/fail`.
//  *     responses:
//  *       302:
//  *         description: Chuyển hướng đến `/auth/success` hoặc `/auth/fail` tùy theo kết quả xác thực
//  */
// router.get(
//     "/google/callback",
//     passport.authenticate("google", { failureRedirect: "/auth/fail" }),
//     (req, res) => {
//       res.redirect("/auth/success");
//     }
// );

// module.exports = router;


