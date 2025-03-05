const UserModel = require("../models/user.models");

class UserService {
    static async getAll() {
        return await UserModel.getAll();
    }

    static async getById(id) {
        return await UserModel.getById(id);
    }

    static async create(data) {
        return await UserModel.create(data);
    }

    static async update(id, data) {
        return await UserModel.update(id, data);
    }

    static async delete(id) {
        return await UserModel.delete(id);
    }
}

module.exports = UserService;
