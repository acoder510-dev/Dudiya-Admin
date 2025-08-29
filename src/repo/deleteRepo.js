import { db } from "../config/connection.js";
import { ObjectId } from "mongodb";
class DeleteRepo {
  constructor(modelName) {
    this.modelName = modelName;
    this.Model = this.importModel();
  }

  async importModel() {
    try {
      const model = await import(`../models/${this.modelName}.js`);
      return model.default;
    } catch (error) {
      throw new Error(`Error importing model: ${error.message}`);
    }
  }

  async deleteWithId(_id) {
    try {
      const Model = await this.Model;
      const deletedUser = await Model.deleteOne({
        _id: new ObjectId(_id),
      });
      return deletedUser;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
  async deleteWithIdMany(Ids) {
    try {
      const Model = await this.Model;
      const deletedUser = await Model.deleteMany({ _id: { $in: Ids } });
      return deletedUser;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}
export default DeleteRepo;
