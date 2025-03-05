const BaseController = require('./base.controllers');
const UserService = require('../services/user.services');

class UserController extends BaseController {
    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAll();
            return BaseController.successResponse(res, users, 'Get all users successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async getUserById(req, res) {
        try {
            const user = await UserService.getById(req.params.id);
            return BaseController.successResponse(res, user, 'Get one users successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async createUser(req, res) {
        try {
            const user = await UserService.create(req.body);
            return BaseController.successResponse(res, user, 'Create user successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async updateUser(req, res) {
        try {
            const user = await UserService.update(req.params.id, req.body);
            return BaseController.successResponse(res, user, 'Update user successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async deleteUser(req, res) {
        try {
            const user = await UserService.delete(req.params.id);
            return BaseController.successResponse(res, user, 'Delete user successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };
}

module.exports = UserController;
