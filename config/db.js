const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'bdxwf44adeb1ipmloxun-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'uwyoqpbbwev351xn',
  password: '6ERmXQFzZtwxuHNCSnxz',
  database: 'bdxwf44adeb1ipmloxun',
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
