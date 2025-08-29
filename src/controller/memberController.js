import MemberService from "../services/memberService.js";
import { Messages } from "../utils/messages.js";

class MemberController {
  /**
   * @description Get member profile
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} Response object
   */
  async getProfile(req, res) {
    try {
      const memberId = req.member.id;
      const result = await MemberService.getProfile({ memberId });

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
   * @description Update member profile
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} Response object
   */
  async updateProfile(req, res) {
    try {
      const memberId = req.member.id;
      const updateData = req.body;
      const result = await MemberService.updateProfile({
        memberId,
        updateData,
      });

      if (result.status === 200) {
        return res.status(200).json({
          success: true,
          message: Messages.MEMBER_UPDATED,
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
   * @description Get member farms
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} Response object
   */
  async getFarms(req, res) {
    try {
      const memberId = req.member.id;
      const result = await MemberService.getFarms({ memberId });

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
   * @description Get member statistics
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} Response object
   */
  async getStatistics(req, res) {
    try {
      const memberId = req.member.id;
      const result = await MemberService.getStatistics({ memberId });

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

export default new MemberController();
