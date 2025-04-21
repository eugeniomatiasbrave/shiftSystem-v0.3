import jwt from "jsonwebtoken";
import logger from "../config/log4js.config.js";
import HttpRes from "../utils/httpResponse.js";
import { UnauthorizedError } from "../utils/customError.js";
import dotenv from 'dotenv';
dotenv.config();


const { JWT_SECRET } = process.env; // Asegúrate de que JWT_SECRET esté definido en tu archivo .env

const register = (req, res, next) => {
  try {
    HttpRes.Success(res, "Registered");
  } catch (error) {
    logger.error("Error registering user:", error);
    next(error); // Pasa el error al manejador de
  }
};

const login = async (req, res, next) => {
  try {
      const user = req.user;
      const tokenPayload = {
          id_user: user.id_user,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
      };
      const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1d" });
      res.cookie("token", token).send({ status: "success", message: "logged in" });
  } catch (error) {
      logger.error("Error logging in user:", error);
      next(error);
  }
};

const current = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      logger.warn("Unauthorized access attempt");
      throw new UnauthorizedError("Unauthorized access"); // Pasa el error al manejador de errores
    }
    HttpRes.Success(res, user, "Current user retrieved"); // Envía el usuario actual en la respuesta
  } catch (error) {
    logger.error("Error retrieving current user:", error);
    next(error); // Pasa el error al manejador de errores
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    HttpRes.Success(res, "Logged out");
  } catch (error) {
    logger.error("Error logging out user:", error);
    next(error); // Pasa el error al manejador de errores
  }
};

export default {
  register,
  login,
  logout,
  current,
};
