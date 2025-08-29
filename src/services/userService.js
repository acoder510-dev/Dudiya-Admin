import FindRepo from "../repo/findRepo.js";
import UpdateRepo from "../repo/updateRepo.js";
import methods from "../utils/methods.js";

class UserService {
  /**
   * @description Get user profile
   * @param {Object} params - Parameters object
   * @param {string} params.userId - User ID
   * @returns {Object} Service response
   */
  async getProfile({ userId }) {
    try {
      const user = await new FindRepo("UserModel").findOne(
        { _id: userId },
        {
          _id: 1,
          email: 1,
          role: 1,
          firstName: 1,
          lastName: 1,
          phone: 1,
          address: 1,
          city: 1,
          state: 1,
          country: 1,
          zipCode: 1,
          is_block: 1,
          status: 1,
          createdAt: 1,
          lastLogin: 1,
        }
      );

      if (!user) {
        return {
          status: 404,
          message: "User not found",
        };
      }

      return {
        status: 200,
        message: "Profile fetched successfully",
        data: user,
      };
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * @description Update user profile
   * @param {Object} params - Parameters object
   * @param {string} params.userId - User ID
   * @param {Object} params.updateData - Data to update
   * @returns {Object} Service response
   */
  async updateProfile({ userId, updateData }) {
    try {
      const allowedFields = [
        "firstName",
        "lastName",
        "phone",
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

      const updatedUser = await new UpdateRepo("UserModel").updateWithId(
        userId,
        filteredData
      );

      if (!updatedUser) {
        return {
          status: 500,
          message: "Failed to update profile",
        };
      }

      return {
        status: 200,
        message: "Profile updated successfully",
        data: updatedUser,
      };
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * @description Change user password
   * @param {Object} params - Parameters object
   * @param {string} params.userId - User ID
   * @param {string} params.currentPassword - Current password
   * @param {string} params.newPassword - New password
   * @returns {Object} Service response
   */
  async changePassword({ userId, currentPassword, newPassword }) {
    try {
      const user = await new FindRepo("UserModel").findOne(
        { _id: userId },
        { password: 1 }
      );

      if (!user) {
        return {
          status: 404,
          message: "User not found",
        };
      }

      const isCurrentPasswordValid = await methods.comparePassword(
        currentPassword,
        user.password
      );
      if (!isCurrentPasswordValid) {
        return {
          status: 400,
          message: "Current password is incorrect",
        };
      }

      const hashedNewPassword = await methods.hashPassword(newPassword);
      const updatedUser = await new UpdateRepo("UserModel").updateWithId(
        userId,
        { password: hashedNewPassword }
      );

      if (!updatedUser) {
        return {
          status: 500,
          message: "Failed to update password",
        };
      }

      return {
        status: 200,
        message: "Password changed successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * @description Get user dashboard data
   * @param {Object} params - Parameters object
   * @param {string} params.userId - User ID
   * @returns {Object} Service response
   */
  async getDashboard({ userId }) {
    try {
      const user = await new FindRepo("UserModel").findOne(
        { _id: userId },
        { role: 1 }
      );

      if (!user) {
        return {
          status: 404,
          message: "User not found",
        };
      }

      let dashboardData = {};

      if (user.role === "field_user") {
        // Get field user specific data
        const [memberCount, farmCount] = await Promise.all([
          new FindRepo("MemberModel").count({ registeredBy: userId }),
          new FindRepo("FarmModel").count({ registeredBy: userId }),
        ]);

        dashboardData = {
          memberCount,
          farmCount,
          role: user.role,
        };
      } else if (user.role === "admin" || user.role === "super_admin") {
        // Get admin specific data
        const [userCount, memberCount, farmCount] = await Promise.all([
          new FindRepo("UserModel").count({ role: "field_user" }),
          new FindRepo("MemberModel").count({}),
          new FindRepo("FarmModel").count({}),
        ]);

        dashboardData = {
          userCount,
          memberCount,
          farmCount,
          role: user.role,
        };
      }

      return {
        status: 200,
        message: "Dashboard data fetched successfully",
        data: dashboardData,
      };
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }

  /**
   * @description Get user statistics
   * @param {Object} params - Parameters object
   * @param {string} params.userId - User ID
   * @returns {Object} Service response
   */
  async getStatistics({ userId }) {
    try {
      const user = await new FindRepo("UserModel").findOne(
        { _id: userId },
        { role: 1 }
      );

      if (!user) {
        return {
          status: 404,
          message: "User not found",
        };
      }

      let statistics = {};

      if (user.role === "field_user") {
        // Get field user statistics
        const [totalMembers, activeMembers, totalFarms, activeFarms] =
          await Promise.all([
            new FindRepo("MemberModel").count({ registeredBy: userId }),
            new FindRepo("MemberModel").count({
              registeredBy: userId,
              isActive: true,
            }),
            new FindRepo("FarmModel").count({ registeredBy: userId }),
            new FindRepo("FarmModel").count({
              registeredBy: userId,
              isActive: true,
            }),
          ]);

        statistics = {
          totalMembers,
          activeMembers,
          totalFarms,
          activeFarms,
          role: user.role,
        };
      } else if (user.role === "admin" || user.role === "super_admin") {
        // Get admin statistics
        const [
          totalUsers,
          activeUsers,
          totalMembers,
          activeMembers,
          totalFarms,
          activeFarms,
        ] = await Promise.all([
          new FindRepo("UserModel").count({ role: "field_user" }),
          new FindRepo("UserModel").count({
            role: "field_user",
            is_block: false,
          }),
          new FindRepo("MemberModel").count({}),
          new FindRepo("MemberModel").count({ isActive: true }),
          new FindRepo("FarmModel").count({}),
          new FindRepo("FarmModel").count({ isActive: true }),
        ]);

        statistics = {
          totalUsers,
          activeUsers,
          totalMembers,
          activeMembers,
          totalFarms,
          activeFarms,
          role: user.role,
        };
      }

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

export default new UserService();
