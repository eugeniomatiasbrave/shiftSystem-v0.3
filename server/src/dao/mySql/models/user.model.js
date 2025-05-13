
import db from "../connection.js";
import { DataTypes } from "sequelize";

export const UserModel = db.define("users", {
  id_user: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
  },
  firstName: { 
    type: DataTypes.STRING, 
    allowNull: false, 
  },
  lastName: { 
    type: DataTypes.STRING, 
    allowNull: false, 
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false,
  },
  phone: { 
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  day_creation: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW, 
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("admin", "user"),
    defaultValue: "user",
  }
});