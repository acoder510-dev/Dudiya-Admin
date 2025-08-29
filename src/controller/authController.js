import AuthService from "../services/authService.js";
import { Messages } from "../utils/messages.js";
import {
  LoginSchema,
  RegisterSchema,
  VerifyOTPSchema,
  ResendOTPSchema,
} from "../validator/authValidator.js";

class AuthController {
  /**
   * @description Login user through email.
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} Response object
   */
  async login(req, res) {
    try {
      const { error, value } = LoginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { email, role } = value;
      const result = await AuthService.login({ email, role });

      return res.status(result.status).json({
        success: result.status === process.env.SUCCESS,
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
   * @description Verify user through otp on email
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} Response object
   */
  async verifyOTP(req, res) {
    try {
      const { error, value } = VerifyOTPSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { email, otp, role } = value;
      const result = await AuthService.verifyOTP({ email, otp, role });

      if (result.status === process.env.SUCCESS) {
        return res.status(result.status).json({
          success: true,
          message: result.message,
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
   * @description Resend user through otp on email
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} Response object
   */
  async resendOTP(req, res) {
    try {
      const { error, value } = ResendOTPSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { email, role } = value;
      const result = await AuthService.resendOTP({ email, role });

      return res.status(result.status).json({
        success: result.status === process.env.SUCCESS,
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
   * @description Register new user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} Response object
   */
  async register(req, res) {
    try {
      const { error, value } = RegisterSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const result = await AuthService.register(value);

      if (result.status === process.env.SUCCESS) {
        return res.status(result.status).json({
          success: true,
          message: result.message,
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
   * @description Refresh JWT token
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} Response object
   */
  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: "Refresh token is required",
        });
      }

      const result = await AuthService.refreshToken({ refreshToken });

      if (result.status === process.env.SUCCESS) {
        return res.status(result.status).json({
          success: true,
          message: result.message,
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
   * @description Logout user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} Response object
   */
  async logout(req, res) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required",
        });
      }

      const result = await AuthService.logout({ userId });

      return res.status(result.status).json({
        success: result.status === process.env.SUCCESS,
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

export default new AuthController();
