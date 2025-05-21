import db from "../connection.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.model.js";

export const ShiftModel = db.define("shifts", {
  id_shift: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
  },
  date: { 
    type: DataTypes.DATEONLY,
    allowNull: false, 
  },
  time: { 
    type: DataTypes.TIME, 
    allowNull: false,
  },
  status: { 
    type: DataTypes.ENUM("available", "pending_payment", "reserved", "canceled"), 
    defaultValue: "available", 
  },
  id_user: { 
    type: DataTypes.INTEGER,
    allowNull: true, // Puede ser nulo si el turno no está reservado, ideal para que este disponible para cualquier usuario.
   },
  id_payment_confirmed: {
    type: DataTypes.INTEGER,
    allowNull: true, // Puede ser nulo si el turno no está pagado/confirmado
    references: {
      model: 'payments',
      key: 'id_payment'
    }
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: true, // Puede ser nulo si el turno no está pagado/confirmado
  },
  createdAt: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW,
    field: "created_at", //
  },
  updatedAt: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW,
    field: "updated_at",
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['date', 'time'], // Define the unique constraint here
    },
  ],
});

ShiftModel.belongsTo(UserModel, { foreignKey: "id_user", onDelete: "SET NULL" });
UserModel.hasMany(ShiftModel, { foreignKey: "id_user" });