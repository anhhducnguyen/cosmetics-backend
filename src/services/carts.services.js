const db = require('../config/database');

class cartservice {
    static async getAll() {
        return db("carts").select("*");
    }

    static async getById(id) {
        return db("carts").where("id", id).select("*");
    }

    static async create(data) {
        return db("carts").insert(data)
    }

    static async update(id, data) {
        return db("carts").update(data).where("id", id);
    }

    static async delete(id) {
        return db("carts").delete().where("id", id);
    }
}

module.exports = cartservice;
