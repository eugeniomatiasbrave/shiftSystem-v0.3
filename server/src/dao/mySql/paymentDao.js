import { PaymentModel } from "./models/payment.model.js";
import { ShiftModel } from "./models/shift.model.js";
import { UserModel } from "./models/user.model.js";

export class PaymentDao {
  constructor() {}

  async createPayment(paymentData) {
    try {
      const newPayment = await PaymentModel.create(paymentData);
      return newPayment;
    } catch (error) {
      throw new Error(`Error creating payment: ${error.message}`);
    }
  }

  async getPaymentById(id_payment) {
    try {
      const payment = await PaymentModel.findByPk(id_payment, {
        include: [
          { model: ShiftModel },
          { model: UserModel }
        ]
      });
      return payment;
    } catch (error) {
      throw new Error(`Error getting payment: ${error.message}`);
    }
  }

  async getPaymentsByUserId(id_user) {
    try {
      const payments = await PaymentModel.findAll({
        where: { id_user },
        include: [{ model: ShiftModel }]
      });
      return payments;
    } catch (error) {
      throw new Error(`Error getting payments by user ID: ${error.message}`);
    }
  }

  async getPaymentsByShiftId(id_shift) {
    try {
      const payments = await PaymentModel.findAll({
        where: { id_shift },
        include: [{ model: UserModel }]
      });
      return payments;
    } catch (error) {
      throw new Error(`Error getting payments by shift ID: ${error.message}`);
    }
  }

  async updatePaymentStatus(id_payment, status) {
    try {
      const payment = await PaymentModel.findByPk(id_payment);
      if (!payment) {
        throw new Error("Payment not found");
      }
      
      payment.payment_status = status;
      payment.updatedAt = new Date();
      await payment.save();
      
      return payment;
    } catch (error) {
      throw new Error(`Error updating payment status: ${error.message}`);
    }
  }

  async updatePaymentTransaction(id_payment, transaction_id, details = null) {
    try {
      const payment = await PaymentModel.findByPk(id_payment);
      if (!payment) {
        throw new Error("Payment not found");
      }
      
      payment.transaction_id = transaction_id;
      if (details) {
        payment.payment_details = details;
      }
      payment.updatedAt = new Date();
      await payment.save();
      
      return payment;
    } catch (error) {
      throw new Error(`Error updating payment transaction: ${error.message}`);
    }
  }

  async getAllPayments() {
    try {
      const payments = await PaymentModel.findAll({
        include: [
          { model: ShiftModel },
          { model: UserModel }
        ]
      });
      return payments;
    } catch (error) {
      throw new Error(`Error getting all payments: ${error.message}`);
    }
  }
} 