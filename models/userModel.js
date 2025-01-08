const pool = require('../config/db');

const userModel = {
  async findByMobileNumber(mobileNumber) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute('SELECT * FROM users WHERE mobile_number = ?', [mobileNumber]);
      return rows;
    } finally {
      connection.release();
    }
  },

  async createUser(firstName, lastName, mobileNumber, hashedPassword) {
    const connection = await pool.getConnection();
    try {
      await connection.execute('CALL sp_CreateUser(?, ?, ?, ?, ?)', [
        firstName,
        lastName,
        mobileNumber,
        hashedPassword,
        'SYSTEM',
      ]);
    } finally {
      connection.release();
    }
  },

  async updateUser(userId, firstName, lastName, mobileNumber) {
    const connection = await pool.getConnection();
    try {
      await connection.execute('CALL sp_UpdateUser(?, ?, ?, ?)', [userId, firstName, lastName, mobileNumber]);
    } finally {
      connection.release();
    }
  },

  async deleteUser(userId) {
    const connection = await pool.getConnection();
    try {
      await connection.execute('CALL sp_DeleteUser(?)', [userId]);
    } finally {
      connection.release();
    }
  },
};

module.exports = userModel;
