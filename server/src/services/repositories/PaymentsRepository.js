export default class PaymentsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createPayment(paymentData) {
    return await this.dao.createPayment(paymentData);
  }

  async getPaymentById(id_payment) {
    return await this.dao.getPaymentById(id_payment);
  }

  async getPaymentsByUserId(id_user) {
    return await this.dao.getPaymentsByUserId(id_user);
  }

  async getPaymentsByShiftId(id_shift) {
    return await this.dao.getPaymentsByShiftId(id_shift);
  }

  async updatePaymentStatus(id_payment, status) {
    return await this.dao.updatePaymentStatus(id_payment, status);
  }

  async updatePaymentTransaction(id_payment, transaction_id, details) {
    return await this.dao.updatePaymentTransaction(id_payment, transaction_id, details);
  }

  async getAllPayments() {
    return await this.dao.getAllPayments();
  }
} 