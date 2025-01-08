const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  port: 3305,
  user: 'root',
  password: 'i love you amma',
  database: 'user_registration',
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
