export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  };

  async getUsers() {
    return await this.dao.get();
  };

  async getUserBy(params) {
    return await this.dao.getOne(params);
  };

  async getUserByEmail(email) {
    return await this.dao.getByEmail(email);
  };

  async createUser(userData) {
    return await this.dao.create(userData);
  };

  async updateUser(id_user, updatedData) {
    return await this.dao.update(id_user, updatedData);
  };

  
  async deleteUser(id_user) {
    return await this.dao.delete(id_user);
  };

  //async updatePassword() { };

};
