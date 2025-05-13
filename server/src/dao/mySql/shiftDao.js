import { ShiftModel } from "./models/shift.model.js";
import { PaymentModel } from "./models/payment.model.js";

export default class ShiftDao {
  async get() {
    try {
      return await ShiftModel.findAll();
    } catch (error) {
      console.error("Error in get:", error);
      throw new Error("Failed to get shifts");
    }
  }

  async getById(id_shift) {
    try {
      return await ShiftModel.findByPk(id_shift);
    } catch (error) {
      console.error("Error in getById:", error);
      throw new Error("Failed to get shift by ID");
    }
  }

  async getByIdWithConfirmedPayment(id_shift) {
    try {
      return await ShiftModel.findByPk(id_shift, {
        include: [
          {
            model: PaymentModel,
            required: false,
            where: { id_payment: ShiftModel.sequelize.col('shifts.id_payment_confirmed') }
          }
        ]
      });
    } catch (error) {
      console.error("Error in getByIdWithConfirmedPayment:", error);
      throw new Error("Failed to get shift with confirmed payment");
    }
  }

  async getByUser(id_user) {
    try {
      return await ShiftModel.findAll({ where: { id_user } });
    } catch (error) {
      console.error("Error in getByUser:", error);
      throw new Error("Failed to get shifts by user");
    }
  }

  async getByDate(date) {
    try {
      return await ShiftModel.findAll({ where: { date, status: "available" } });
    } catch (error) {
      console.error("Error in getByDate:", error);
      throw new Error("Failed to get shifts by date");
    }
  }

  async create(shiftData) {
    try {
      return await ShiftModel.create(shiftData);
    } catch (error) {
      console.error("Error in create:", error);
      throw new Error("Failed to create shift");
    }
  }

  async update(id_shift, updatedShift) {
    try {
      return await ShiftModel.update(updatedShift, { where: { id_shift } });
    } catch (error) {
      console.error("Error in update:", error);
      throw new Error("Failed to update shift");
    }
  }

  async updateStatus(id_shift, status) {
    try {
      return ShiftModel.update({ status }, { where: { id_shift } });
    } catch (error) {
      console.error("Error in updateShiftStatus:", error);
      throw new Error("Failed to update shift status");
    }
  }

  async reschedule(id_shift, newDate) {
    try {
      return await ShiftModel.update(
        { date: newDate },
        { where: { id_shift } }
      );
    } catch (error) {
      console.error("Error in rescheduleShift:", error);
      throw new Error("Failed to reschedule shift");
    }
  }

  async reserve(id_shift, id_user) {
    try {
      return await ShiftModel.update(
        { status: "reserved", id_user },
        { where: { id_shift } }
      );
    } catch (error) {
      console.error("Error in reserveShift:", error);
      throw new Error("Failed to reserve shift");
    }
  }

  async cancel(id_shift) {
    try {
      return await ShiftModel.update(
        { status: "available", id_user: null, id_payment_confirmed: null },
        { where: { id_shift } }
      );
    } catch (error) {
      console.error("Error in cancelShift:", error);
      throw new Error("Failed to cancel shift");
    }
  }

  async delete(id_shift) {
    try {
      return await ShiftModel.destroy({ where: { id_shift } });
    } catch (error) {
      console.error("Error in delete:", error);
      throw new Error("Failed to delete shift");
    }
  }
}
