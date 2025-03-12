const db = require('../config/database');

class OrderdetailService {
    static async getAll() {
        return db("users").select("*");
    }

    static async getById(id) {
        return db("users").where("id", id).select("*");
    }

    static async create(data) {
        return db("users").insert(data)
    }

    static async update(id, data) {
        return db("users").update(data).where("id", id);
    }

    static async delete(id) {
        return db("users").delete().where("id", id);
    }
}

module.exports = OrderdetailService;
