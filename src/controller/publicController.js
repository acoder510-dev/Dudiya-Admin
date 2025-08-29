import FindRepo from "../repo/findRepo.js";
import { Messages } from "../utils/messages.js";

class PublicController {
  /**
   * @description Get all locations
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} Response object
   */
  async getLocations(req, res) {
    try {
      const locations = await new FindRepo("LocationModel").find(
        { isActive: true },
        { name: 1, type: 1, parentId: 1 }
      );

      return res.status(200).json({
        success: true,
        message: Messages.LOCATIONS_FETCHED,
        data: locations,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * @description Get public data (locations)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} Response object
   */
  async getPublicData(req, res) {
    try {
      const locations = await new FindRepo("LocationModel").find(
        { isActive: true },
        { name: 1, type: 1, parentId: 1 }
      );

      return res.status(200).json({
        success: true,
        message: Messages.PUBLIC_DATA_FETCHED,
        data: {
          locations,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new PublicController();
