const Joi = require("joi");

module.exports.registerBody = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": "Email không hợp lệ (chỉ chấp nhận đuôi .com hoặc .net).",
      "string.empty": "Email không được để trống.",
      "any.required": "Email là bắt buộc."
    }),

  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,30}$"))
    .required()
    .messages({
      "string.pattern.base": "Password phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
      "string.empty": "Password không được để trống.",
      "any.required": "Password là bắt buộc."
    })
});

module.exports.productValidationSchema = Joi.object({
  productName: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "Tên sản phẩm phải là một chuỗi văn bản.",
      "string.min": "Tên sản phẩm phải có ít nhất 3 ký tự.",
      "string.max": "Tên sản phẩm không được vượt quá 100 ký tự.",
      "any.required": "Tên sản phẩm là bắt buộc."
    }),

  productLine: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Dòng sản phẩm phải là một số.",
      "number.positive": "Dòng sản phẩm phải là một số dương.",
      "any.required": "Dòng sản phẩm là bắt buộc."
    }),

  productVendor: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "Nhà cung cấp phải là một chuỗi văn bản.",
      "string.min": "Nhà cung cấp phải có ít nhất 3 ký tự.",
      "string.max": "Nhà cung cấp không được vượt quá 100 ký tự.",
      "any.required": "Nhà cung cấp là bắt buộc."
    }),

  productDescription: Joi.string()
    .max(500)
    .optional()
    .messages({
      "string.base": "Mô tả sản phẩm phải là một chuỗi văn bản.",
      "string.max": "Mô tả sản phẩm không được vượt quá 500 ký tự."
    }),

  quantityInstock: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      "number.base": "Số lượng trong kho phải là một số nguyên.",
      "number.min": "Số lượng trong kho phải lớn hơn hoặc bằng 0.",
      "any.required": "Số lượng trong kho là bắt buộc."
    }),

  price: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Giá sản phẩm phải là một số.",
      "number.positive": "Giá sản phẩm phải là một số dương.",
      "any.required": "Giá sản phẩm là bắt buộc."
    }),

  images: Joi.array()
    .items(Joi.string().uri())
    .optional()
    .messages({
      "array.base": "Danh sách ảnh phải là một mảng.",
      "array.items": "Mỗi ảnh trong danh sách phải là một chuỗi URL hợp lệ.",
    })
});

