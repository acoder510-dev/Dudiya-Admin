class CreateRepo {
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

  async create(data) {
    try {
      const Model = await this.Model;
      const result = await Model.create(data);
      return result;
    } catch (error) {
      throw new Error(`Error creating data: ${error.message}`);
    }
  }
}
export default CreateRepo;
