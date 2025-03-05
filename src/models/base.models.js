const db = require("../config/database");

/** 
 
 Define a base class (BaseModel) that helps handle CRUD (Create, Read, Update, Delete) 
 operations on the database in a general and reusable way.  

**/

class BaseModel {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async getAll() {
        return db(this.tableName);
    }

    async getById(id) {
        return db(this.tableName).where("id", id).first();
    }

    async findByField(field, value) {
        return db(this.tableName).where(field, value).first();
    }

    async create(data) {
        return db(this.tableName).insert(data);
    }

    async update(id, data) {
        return db(this.tableName).where("id", id).update(data);
    }

    async delete(id) {
        return db(this.tableName).where("id", id).del();
    }
}

module.exports = BaseModel;
