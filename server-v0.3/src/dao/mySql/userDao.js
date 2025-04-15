import { UserModel } from "./models/user.model.js";

export default class UserDao {
  async get() {
    try {
      return await UserModel.findAll();
    } catch (error) {
      console.error("Error in get:", error);
      throw new Error("Failed to get users");
    }
  }

  async getOne(params) {
    try {
      return await UserModel.findOne({ where: params });
    } catch (error) {
      console.error("Error in getOne:", error);
      throw new Error("Failed to get user");
    }
  }

  async create(userData) {
    try {
      return await UserModel.create(userData);
    } catch (error) {
      console.error("Error in create:", error);
      throw new Error("Failed to create user");
    }
  }

  async update(id_user, updatedData) {
    try {
      return await UserModel.update(updatedData, {
        where: { id_user: id_user },
      });
    } catch (error) {
      console.error("Error in update:", error);
      throw new Error("Failed to update user");
    }
  }

  async delete(id_user) {
    try {
      return await UserModel.destroy({ where: { id_user: id_user } });
    } catch (error) {
      console.error("Error in delete:", error);
      throw new Error("Failed to delete user");
    }
  }

  async Password(id_user, password) {
    try {
      return await UserModel.update({ password }, { where: { id_user } });
    } catch (error) {
      console.error("Error in updatePassword:", error);
      throw new Error("Failed to update password");
    }
  }
}
