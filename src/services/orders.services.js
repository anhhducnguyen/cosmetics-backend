const db = require('../config/database');

class OrderService {
    static async getAll() {
        return db("orders").select("*");
    }

    static async getById(id) {
        return db("orders").where("id", id).select("*");
    }

    static async create(data) {
        return db("orders").insert(data)
    }

    static async update(id, data) {
        return db("orders").update(data).where("id", id);
    }

    static async delete(id) {
        return db("orders").delete().where("id", id);
    }
}

module.exports = OrderService;
