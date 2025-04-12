const BaseController = require('./base.controllers');
const Service = require('../services/user.services');

class UserController extends BaseController {
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
            const { username, email, password } = req.body;
            const existingUser = await Service.findEmail(email);
            
            if (existingUser) {
                return BaseController.errorResponse(res, 'Email đã tồn tại', 400);
            }
            
            const data = await Service.create({ username, email, password });

            return BaseController.successResponse(res, data, 'Create successfully', 201);
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

module.exports = UserController;
