import jwt from "jsonwebtoken";
import config from "../config/config.env.js";
import userDto from "../dto/userDto.js";
import logger from "../config/log4js.config.js";
import HttpRes from "../utils/httpResponse.js";
import { UnauthorizedError } from "../utils/customError.js";

const SECRET = config.auth.jwt.SECRET;

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
    const TokenResponseDto = userDto.forToken(user); // Use userDto.js to format the user data for the token
    const token = jwt.sign(TokenResponseDto, SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, secure: true }); // Asegura las cookies
    HttpRes.Success(res, "Logged in");
  } catch (error) {
    logger.error("Error logging in user:", error);
    next(error);
  }
};

const adminAccess = async (req, res, next) => {
  try {
    const admin = req.user;
    HttpRes.Success(res, admin);
  } catch (error) {
    logger.error("Error granting admin access:", error);
    next(error);
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

const current = async (req, res, next) => {
  // Add the current function, which will return the current user, if logged in, or an error message if not
  try {
    const user = req.user;
    if (!user) {
      logger.warn("Unauthorized access attempt");
      throw new UnauthorizedError("Unauthorized access"); // Pasa el error al manejador de errores
    }
    HttpRes.Success(res, user);
  } catch (error) {
    logger.error("Error retrieving current user:", error);
    next(error); // Pasa el error al manejador de errores
  }
};

export default {
  register,
  login,
  logout,
  adminAccess,
  current,
};
