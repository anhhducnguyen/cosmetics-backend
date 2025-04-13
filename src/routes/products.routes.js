const express = require('express');
const router = express.Router();
const Controller = require('../controllers/products.controller');
const uploadMulti = require("../middlewares/upload");



router.get('/', Controller.getAll);
router.get('/:id', Controller.getById);
router.post("/", uploadMulti.array("photoList", 3), Controller.create);
// router.post('/', Controller.create);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.delete);

module.exports = router;
