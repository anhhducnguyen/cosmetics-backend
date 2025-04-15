const express = require('express');
const router = express.Router();
const Controller = require('../controllers/products.controller');
const uploadMulti = require("../middlewares/upload");
const { createProductSchema  } = require("../middlewares/validate-schema");
const validateRequest = require("../middlewares/validateRequest");
const queryHandler = require("../middlewares/queryHandler");
const authorize = require("../middlewares/auth.middlewares");



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
    // authorize(["admin", "seller"]), 
    validateRequest(createProductSchema), 
    uploadMulti.array("photoList", 3), 
    Controller.create,
);
router.put(
    '/:id', 
    // authorize(["admin", "seller"]), 
    validateRequest(createProductSchema),
    Controller.update
);
router.delete(
    '/:id', 
    // authorize(["admin", "seller"]), 
    Controller.delete,
);

module.exports = router;
