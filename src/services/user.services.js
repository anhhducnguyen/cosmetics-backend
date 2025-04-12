const db = require('../config/database');

class UserService {
    static async getAll() {
        return db("users")
            .select("*");
    }

    static async getById(id) {
        return db("users")
            .where("id", id)
            .select("*");
    }

    static async create({ username, email, password }) {
        return db("users").insert({
            username,
            email,
            password
        })
    }

    static async update(id, data) {
        return db("users")
            .update(data)
            .where("id", id);
    }

    static async delete(id) {
        return db("users")
            .delete()
            .where("id", id);
    }

    static async findEmail(email) {
        return db("users")
            .where({ email })
            .first();
    }

    static async findById(id) {
        return db("users")
            .where({ id })
            .first();
    }
}

module.exports = UserService;
