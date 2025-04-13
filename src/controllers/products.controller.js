const BaseController = require('./base.controllers');
const Service = require('../services/products.services');

class ProductController extends BaseController {
    static async getAll(req, res) {
        try {
            // const data = await Service.getAll();
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            
            const data = await Service.getAll(page, limit);
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
            let { 
                productName, 
                productLine, 
                productVendor, 
                productDescription, 
                quantityInstock, 
                price 
            } = req.body;

            const images  = req.files.map(file => file.filename); 
            console.log("Name image:", images );

            const data = await Service.create({ 
                productName, 
                productLine, 
                productVendor, 
                productDescription, 
                quantityInstock, 
                price,
                images  
            });

            return BaseController.successResponse(res, data, 'Create successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async update(req, res) {
        try {
            let id = req.params.id;
            let { 
                productName, 
                productLine, 
                productVendor, 
                productDescription, 
                quantityInstock, 
                price 
            } = req.body;
            // const data = await Service.update(req.params.id, req.body);
           
            const data = await Service.update({
                id,
                productName, 
                productLine, 
                productVendor, 
                productDescription, 
                quantityInstock, 
                price 
            });

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

module.exports = ProductController;
