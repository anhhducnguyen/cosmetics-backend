const express = require('express');
const router = express.Router();
const Controller = require('../controllers/products.controller');
const uploadMulti = require("../middlewares/upload");
const { productValidationSchema  } = require("../middlewares/validate-schema");
const validateRequest = require("../middlewares/validateRequest");

router.get('/', Controller.getAll);
router.get('/:id', Controller.getById);
router.post(
    "/", 
    validateRequest(productValidationSchema), 
    uploadMulti.array("photoList", 3), 
    Controller.create
);
router.put(
    '/:id', 
    validateRequest(productValidationSchema),
    Controller.update
);
router.delete('/:id', Controller.delete);

module.exports = router;
