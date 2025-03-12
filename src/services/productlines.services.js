const db = require('../config/database');

class ProductLineService {
    static async getAll() {
        return db('productlines').select("*");
    }

    static async getById(id) {
        return db('productlines').where('id', id).select("*");
    }

    static async create(data) {
        return db('productlines').insert(data);
    }

    static async update(id, data) {
        return db('productlines').update(data).where("id", id);
    }

    static async delete(id) {
        return db("productlines").delete().where("id", id);
    }
}

module.exports = ProductLineService;
