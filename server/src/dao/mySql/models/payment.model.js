import db from "../connection.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.model.js";
import { ShiftModel } from "./shift.model.js";

export const PaymentModel = db.define("payments", {
  id_payment: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
  },
  id_shift: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_user: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: { 
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  currency: { 
    type: DataTypes.STRING(3),
    allowNull: false,
    defaultValue: "ARS",
  },
  payment_method: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment_status: { 
    type: DataTypes.ENUM("pending_payment", "completed", "failed", "refunded"), 
    defaultValue: "pending_payment", 
  },
  payment_date: { 
    type: DataTypes.DATE,
    allowNull: true,
  },
  transaction_id: { 
    type: DataTypes.STRING,
    allowNull: true,
  },
  payment_details: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  createdAt: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW,
    field: "created_at",
  },
  updatedAt: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW,
    field: "updated_at",
  },
});

// Definir relaciones
PaymentModel.belongsTo(ShiftModel, { foreignKey: "id_shift", onDelete: "CASCADE" });
ShiftModel.hasMany(PaymentModel, { foreignKey: "id_shift" });

PaymentModel.belongsTo(UserModel, { foreignKey: "id_user" });
UserModel.hasMany(PaymentModel, { foreignKey: "id_user" }); 