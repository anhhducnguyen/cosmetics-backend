const db = require('../config/database');

class reviewservice {
    static async getAll() {
        return db("reviews").select("*");
    }

    static async getById(id) {
        return db("reviews").where("id", id).select("*");
    }

    static async create(data) {
        return db("reviews").insert(data)
    }

    static async update(id, data) {
        return db("reviews").update(data).where("id", id);
    }

    static async delete(id) {
        return db("reviews").delete().where("id", id);
    }
}

module.exports = reviewservice;
