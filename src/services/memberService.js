import FindRepo from "../repo/findRepo.js";
import UpdateRepo from "../repo/updateRepo.js";

class MemberService {
  /**
   * @description Get member profile
   * @param {Object} params - Parameters object
   * @param {string} params.memberId - Member ID
   * @returns {Object} Service response
   */
  async getProfile({ memberId }) {
    try {
      const member = await new FindRepo("MemberModel").findOne(
        { _id: memberId },
        {
          _id: 1,
          firstName: 1,
          lastName: 1,
          phone: 1,
          email: 1,
          address: 1,
          city: 1,
          state: 1,
          country: 1,
          zipCode: 1,
          farmDetails: 1,
          documents: 1,
          registeredBy: 1,
          isActive: 1,
          createdAt: 1,
        }
      );

      if (!member) {
        return {
          status: 404,
          message: "Member not found",
        };
      }

      return {
        status: 200,
        message: "Profile fetched successfully",
        data: member,
      };
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * @description Update member profile
   * @param {Object} params - Parameters object
   * @param {string} params.memberId - Member ID
   * @param {Object} params.updateData - Data to update
   * @returns {Object} Service response
   */
  async updateProfile({ memberId, updateData }) {
    try {
      const allowedFields = [
        "firstName",
        "lastName",
        "phone",
        "email",
        "address",
        "city",
        "state",
        "country",
        "zipCode",
      ];

      const filteredData = {};
      allowedFields.forEach((field) => {
        if (updateData[field] !== undefined) {
          filteredData[field] = updateData[field];
        }
      });

      if (Object.keys(filteredData).length === 0) {
        return {
          status: 400,
          message: "No valid fields to update",
        };
      }

      const updatedMember = await new UpdateRepo("MemberModel").updateWithId(
        memberId,
        filteredData
      );

      if (!updatedMember) {
        return {
          status: 500,
          message: "Failed to update profile",
        };
      }

      return {
        status: 200,
        message: "Profile updated successfully",
        data: updatedMember,
      };
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * @description Get member farms
   * @param {Object} params - Parameters object
   * @param {string} params.memberId - Member ID
   * @returns {Object} Service response
   */
  async getFarms({ memberId }) {
    try {
      const farms = await new FindRepo("FarmModel").find(
        { ownerId: memberId },
        {
          _id: 1,
          farmName: 1,
          farmSize: 1,
          farmSizeUnit: 1,
          location: 1,
          coordinates: 1,
          soilType: 1,
          irrigationType: 1,
          isActive: 1,
          createdAt: 1,
        }
      );

      return {
        status: 200,
        message: "Farms fetched successfully",
        data: farms,
      };
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * @description Get member statistics
   * @param {Object} params - Parameters object
   * @param {string} params.memberId - Member ID
   * @returns {Object} Service response
   */
  async getStatistics({ memberId }) {
    try {
      const [totalFarms, activeFarms] = await Promise.all([
        new FindRepo("FarmModel").count({ ownerId: memberId }),
        new FindRepo("FarmModel").count({ ownerId: memberId, isActive: true }),
      ]);

      const statistics = {
        totalFarms,
        activeFarms,
        memberId,
      };

      return {
        status: 200,
        message: "Statistics fetched successfully",
        data: statistics,
      };
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }
}

export default new MemberService();
