const knex = require('knex');
const config = require('../../knexfile');

const db = knex(config.development);

// const getUsers = async () => {
//     try {
//       const info = await db.select('*').from('knex_migrations'); 
//       return info;
//     } catch (error) {
//       console.error('Lỗi khi lấy dữ liệu từ database:', error);
//       return [];
//     }
// };
  
// getUsers().then(info => console.log(info));

module.exports = db;