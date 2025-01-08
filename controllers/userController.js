const userModel = require('../models/userModel');

const userController = {
  async getProfile(req, res) {
    try {
      const users = await userModel.findByMobileNumber(req.user.mobileNumber);
      if (users.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = users[0];
      res.json({
        firstName: user.first_name,
        lastName: user.last_name,
        mobileNumber: user.mobile_number,
      });
    } catch (error) {
      console.error('Profile fetch error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async updateProfile(req, res) {
    try {
      const { firstName, lastName } = req.body;
      await userModel.updateUser(req.user.id, firstName, lastName, req.user.mobileNumber);
      res.json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Profile update error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async deleteAccount(req, res) {
    try {
      await userModel.deleteUser(req.user.id);
      res.json({ message: 'Account deleted successfully' });
    } catch (error) {
      console.error('Account deletion error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = userController;
