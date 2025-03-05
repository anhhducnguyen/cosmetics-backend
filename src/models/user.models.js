const BaseModel = require('./base.models');

class UserModel extends BaseModel{ 
    constructor() {
        super("users"); /**  Gán bảng "users" cho BaseModel **/
    }
}

module.exports = new UserModel;