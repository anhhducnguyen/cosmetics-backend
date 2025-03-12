const db = require('../config/database');

class DiscountService {
    static async getAll() {
        return db('discounts').select("*");
    }

    static async getById(id) {
        return db('discounts').where('id', id).select("*");
    }

    static async create(data) {
        return db('discounts').insert(data);
    }

    static async update(id, data) {
        return db('discounts').update(data).where("id", id);
    }

    static async delete(id) {
        return db("discounts").delete().where("id", id);
    }
}

module.exports = DiscountService;
