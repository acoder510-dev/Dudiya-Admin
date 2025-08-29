import { db } from "../config/connection.js";
import { ObjectId } from "mongodb";

class FindRepo {
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

  async findOne(query, projection = {}) {
    try {
      const Model = await this.Model;
      return await Model.findOne(query, projection);
    } catch (error) {
      throw new Error(`Error importing model: ${error.message}`);
    }
  }

  async findById(id, projection = {}) {
   
    try {
      const Model = await this.Model;
      return await Model.findOne({ _id: id }, projection);
    } catch (error) {
      throw new Error(`Error importing model: ${error.message}`);
    }
  }

  async findWithAggregate(pipeline = []) {
    try {
      const Model = await this.Model;
      const data = await Model.aggregate(pipeline);
      return await data;
    } catch (error) {
      throw new Error(`Error importing model: ${error.message}`);
    }
  }

  // async findWithAggregate(pipeline = []) {
  //   const Model = await this.Model;
  //   const cursor = await Model.aggregate(pipeline);
  //   const data = await cursor.next();
  //   return data;
  // }

  async FindAll(query = {}, projection = {}, limit = 10, skip = 0, sort = {}) {
    try {
      const Model = await this.Model;
      return Model.find(query, projection).limit(limit).skip(skip).sort(sort);
    } catch (error) {
      throw new Error(`Error importing model: ${error.message}`);
    }
  }

  async findCount(query) {
    try {
      const Model = await this.Model;
      return Model.countDocuments(query);
    } catch (error) {
      throw new Error(`Error importing model: ${error.message}`);
    }
  }
}
export default FindRepo;
