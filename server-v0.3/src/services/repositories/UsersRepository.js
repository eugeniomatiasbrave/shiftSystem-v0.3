export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getUsers() {
    return await this.dao.get();
  }

  async getUserBy(params) {
    return await this.dao.getOne(params);
  }

  async createUser(userData) {
    return await this.dao.create(userData);
  }

  async updateUser(id_user, updatedData) {
    return await this.dao.update(id_user, updatedData);
  }

  async deleteUser(id_user) {
    return await this.dao.delete(id_user);
  }

  async updatePassword(id_user, password) {
    return await this.dao.Password(id_user, password);
  }
}
