import jwt from "jsonwebtoken";
import logger from "../config/log4js.config.js";
import HttpRes from "../utils/httpResponse.js";
import config from "../config/config.env.js";


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
    const user = req.user; // Obtiene el usuario autenticado desde el middleware de Passport

    if (!user) {
      return res.status(401).send({ status: "error", message: "Invalid credentials" });
    }
    console.log("User-cookie: found", user);

    const tokenPayload = {
      id_user: user.id_user,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, config.jwt.SECRET, { expiresIn: config.jwt.EXPIRES_IN });
    console.log("Token-login", token);
    
    // Tiempo de expiración en milisegundos (1 día)
    const expirationTime = 24 * 60 * 60 * 1000;
    
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // Usar secure solo en producción
        maxAge: expirationTime,
      }).send({ status: "success", message: "Logged in", payload: user });

  } catch (error) {
    logger.error("Error logging in user:", error);
    next(error);
  }
};

const current = async (req, res) => {
  if(!req.user){
    return res.status(401).send({status:"error",error:"Not logged in"});
}
res.send(req.user);
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
