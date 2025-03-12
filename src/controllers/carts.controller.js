const BaseController = require('./base.controllers');
const Service = require('../services/carts.services');

class CartController extends BaseController {
    static async getAll(req, res) {
        try {
            const data = await Service.getAll();

            return BaseController.successResponse(res, data, 'Get all successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async getById(req, res) {
        try {
            const data = await Service.getById(req.params.id);

            return BaseController.successResponse(res, data, 'Get one successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async create(req, res) {
        try {
            const data = await Service.create(req.body);

            return BaseController.successResponse(res, data, 'Create successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async update(req, res) {
        try {
            const data = await Service.update(req.params.id, req.body);

            return BaseController.successResponse(res, data, 'Update successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async delete(req, res) {
        try {
            const data = await Service.delete(req.params.id);

            return BaseController.successResponse(res, data, 'Delete successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };
}

module.exports = CartController;
