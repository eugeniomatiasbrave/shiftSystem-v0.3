export default class ShiftsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getShifts() {
    return await this.dao.get();
  }

  async getShiftById(id_shift) {
    return await this.dao.getById(id_shift);
  }

  async getShiftsByDate(date) {
    return await this.dao.getByDate(date);
  }

  async getShiftsByUser(id_user) {
    return await this.dao.getByUser(id_user);
  }

  async createShift(shiftData) {
    return await this.dao.create(shiftData);
  }

  async updateShift(id_shift, updatedShift) {
    return await this.dao.update(id_shift, updatedShift);
  }

  async updateShiftStatus(id_shift, status) {
    return this.dao.updateStatus(id_shift, status);
  }

  async rescheduleShift(id_shift, newDate) {
    return await this.dao.reschedule(id_shift, newDate);
  }

  async reserveShift(id_shift, id_user) {
    return await this.dao.reserve(id_shift, id_user);
  }

  async cancelShift(id_shift) {
    return await this.dao.cancel(id_shift);
  }

  async deleteShift(id_shift) {
    return await this.dao.delete(id_shift);
  }
}
