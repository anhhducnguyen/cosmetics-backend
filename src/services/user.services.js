const db = require('../config/database');

class UserService {

    // static async getAll() {
    //     return db("users")
    //         .select("*");
    // }

    static async getAll({ page = 1, limit = 10, sortBy = 'id', sortOrder = 'asc' }) {
        const offset = (page - 1) * limit;  // Tính toán offset cho phân trang

        return db("users")
            .select("*")
            .orderBy(sortBy, sortOrder)  
            .limit(limit)  
            .offset(offset);  
    }

    static async getCount() {
        return db("users")
            .countDistinct('id as count');  // Đếm số lượng bản ghi trong bảng
    }

    static async getById(id) {
        return db("users")
            .where("id", id)
            .select("*");
    }

    static async create({ 
        name, 
        age, 
        gender, 
        role, 
        username, 
        email, 
        hashedPassword, 
        avatar 
    }) {
        return db("users").insert({
            username,
            email,
            password: hashedPassword, 
            avatar,
            name, 
            age, 
            gender, 
            role,
        })
    }

    static async update({ 
        id, 
        name, 
        age, 
        gender, 
        role, 
        username, 
        email,
        avatar 
    }) {
        return db("users")
            .update({ 
                id, 
                name, 
                age, 
                gender, 
                role, 
                username, 
                email,
                avatar 
            })
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
