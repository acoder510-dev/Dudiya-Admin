import UserService from "../services/userService.js";
import { Messages } from "../utils/messages.js";

class UserController {
  /**
   * @description Get user profile
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} Response object
   */
  async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const result = await UserService.getProfile({ userId });

      if (result.status === 200) {
        return res.status(200).json({
          success: true,
          message: Messages.SUCCESS,
          data: result.data,
        });
      }

      return res.status(result.status).json({
        success: false,
        message: result.message,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * @description Update user profile
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} Response object
   */
  async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const updateData = req.body;
      const result = await UserService.updateProfile({ userId, updateData });

      if (result.status === 200) {
        return res.status(200).json({
          success: true,
          message: Messages.USER_UPDATED,
          data: result.data,
        });
      }

      return res.status(result.status).json({
        success: false,
        message: result.message,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * @description Change user password
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} Response object
   */
  async changePassword(req, res) {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;
      const result = await UserService.changePassword({
        userId,
        currentPassword,
        newPassword,
      });

      if (result.status === 200) {
        return res.status(200).json({
          success: true,
          message: Messages.SUCCESS,
        });
      }

      return res.status(result.status).json({
        success: false,
        message: result.message,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * @description Get user dashboard data
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} Response object
   */
  async getDashboard(req, res) {
    try {
      const userId = req.user.id;
      const result = await UserService.getDashboard({ userId });

      if (result.status === 200) {
        return res.status(200).json({
          success: true,
          message: Messages.DASHBOARD_DATA,
          data: result.data,
        });
      }

      return res.status(result.status).json({
        success: false,
        message: result.message,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * @description Get user statistics
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} Response object
   */
  async getStatistics(req, res) {
    try {
      const userId = req.user.id;
      const result = await UserService.getStatistics({ userId });

      if (result.status === 200) {
        return res.status(200).json({
          success: true,
          message: Messages.SUCCESS,
          data: result.data,
        });
      }

      return res.status(result.status).json({
        success: false,
        message: result.message,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new UserController();
