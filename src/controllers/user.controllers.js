const BaseController = require('./base.controllers');
const Service = require('../services/user.services');
const bcrypt = require("bcrypt");

class UserController extends BaseController {
    static async getAll(req, res) {
        try {
            const { page = 1, limit = 10, sortBy = 'id', sortOrder = 'asc' } = req.query;

            const data = await Service.getAll({
                page: parseInt(page), 
                limit: parseInt(limit), 
                sortBy, 
                sortOrder
            });

            const [{ count }] = await Service.getCount();

            return BaseController.successResponse(
                res,
                data,
                'Get all successfully',
                200,
                {
                    pagination: {
                        total: count,
                        page: parseInt(page),
                        limit: parseInt(limit),
                        totalPages: Math.ceil(count / limit)
                    }
                }
            );
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    }

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
            // console.log(req.body);
            const { 
                name, 
                age, 
                gender, 
                role, 
                username, 
                email, 
                password 
            } = req.body;
            
            const hashedPassword = await bcrypt.hash(password, 10);
            let avatar = req.fileName;
            console.log(avatar);
            
            const data = await Service.create({ 
                name, 
                age, 
                gender, 
                role, 
                username, 
                email, 
                hashedPassword, 
                avatar 
            });

            return BaseController.successResponse(res, data, 'Create successfully', 201);
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async update(req, res) {
        try {
            let id = req.params.id;
            let avatar = req.fileName;
            console.log(avatar);
            
            const { 
                name, 
                age, 
                gender, 
                role, 
                username, 
                email 
            } = req.body;
            
            const data = await Service.update({ 
                id, 
                name, 
                age, 
                gender, 
                role, 
                username, 
                email,
                avatar 
            });

            return BaseController.successResponse(res, data, 'Update successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async delete(req, res) {
        try {
            let id = req.params.id;
            const data = await Service.delete(id);

            return BaseController.successResponse(res, data, 'Delete successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };
}

module.exports = UserController;
