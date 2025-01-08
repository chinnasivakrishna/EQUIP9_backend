const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authController = {
  async register(req, res) {
    try {
      const { firstName, lastName, mobileNumber, password } = req.body;

      if (!firstName || !lastName || !mobileNumber || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const existingUsers = await userModel.findByMobileNumber(mobileNumber);
      if (existingUsers.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      await userModel.createUser(firstName, lastName, mobileNumber, hashedPassword);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async login(req, res) {
    try {
      const { mobileNumber, password } = req.body;
      const users = await userModel.findByMobileNumber(mobileNumber);

      if (users.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = users[0];
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, mobileNumber: user.mobile_number },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1h' }
      );

      res.json({ token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = authController;
