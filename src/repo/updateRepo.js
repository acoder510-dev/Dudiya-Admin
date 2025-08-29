import { db } from "../config/connection.js";
import { ObjectId } from "mongodb";

class UpdateRepo {
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
  async updateWithId(_id, data, projection = {}) {
    try {
      const Model = await this.Model;
      return await Model.findOneAndUpdate(
        { _id: new ObjectId(_id) },
        { $set: data },
        { new: true, projection, lean: true }
      );
    } catch (error) {
      throw new Error(`Error importing model: ${error.message}`);
    }
  }

  async updateMany(query, data, projection = {}) {
    try {
      const Model = await this.Model;
      return await Model.updateMany(
        query,
        { $set: data },
        { new: true, projection, lean: true }
      );
    } catch (error) {
      throw new Error(`Error importing model: ${error.message}`);
    }
  }
  async updateOne(query, data) {
    try {
      const Model = await this.Model;
      return await Model.updateOne(query, { $set: data });
    } catch (error) {
      throw new Error(`Error importing model: ${error.message}`);
    }
  }
}
export default UpdateRepo;
