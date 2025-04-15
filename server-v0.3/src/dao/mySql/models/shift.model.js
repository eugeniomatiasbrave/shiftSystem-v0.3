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
    type: DataTypes.ENUM("available", "reserved", "canceled"), 
    defaultValue: "available", 
  },
  id_user: { 
    type: DataTypes.INTEGER,
    allowNull: true, // Puede ser nulo si el turno no está reservado, ideal para que este disponible para cualquier usuario.
   },
});

ShiftModel.belongsTo(UserModel, { foreignKey: "id_user", onDelete: "SET NULL" });
UserModel.hasMany(ShiftModel, { foreignKey: "id_user" });
