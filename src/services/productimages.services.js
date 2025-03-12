const db = require('../config/database');

class ProductimageService {
    static async getAll() {
        return db("productimages").select("*");
    }

    static async getById(id) {
        return db("productimages").where("id", id).select("*");
    }

    static async create(data) {
        return db("productimages").insert(data)
    }

    static async update(id, data) {
        return db("productimages").update(data).where("id", id);
    }

    static async delete(id) {
        return db("productimages").delete().where("id", id);
    }
}

module.exports = ProductimageService;
