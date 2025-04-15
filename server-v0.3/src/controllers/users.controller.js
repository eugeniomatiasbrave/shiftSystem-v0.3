import { usersServices } from "../services/indexRepositories.js"; // Importa el servicio de usuarios
import logger from "../config/log4js.config.js"; // Importa el logger
import {
  NotFoundError,
  BadRequestError,
  ValidatorError,
} from "../utils/customError.js"; // Importa los errores personalizados
import HttpRes from "../utils/httpResponse.js"; // Importa la clase de respuesta HTTP

const getUsers = async (req, res, next) => {
  try {
    const users = await usersServices.getUsers();
    HttpRes.Success(res, users);
  } catch (error) {
    logger.error("Error retrieving users:", error);
    next(error); // Pasa el error al manejador de errores
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await usersServices.getUserBy({ id_user: req.params.id_user });
    if (!user) {
      logger.warn(`User with id_user ${req.params.id_user} not found`);
      throw new NotFoundError("User not found"); // Pasa el error al manejador de errores
    }
    HttpRes.Success(res, user);
  } catch (error) {
    logger.error("Error retrieving user by id_user:", error);
    next(error); // Pasa el error al manejador de errores
  }
};

const getUserByEmail = async (req, res, next) => {
  try {
    const email = await usersServices.getUserBy({ email: req.params.email }); // Obtiene el email de los parámetros de la URL
    if (!email) {
      logger.warn(`User with email ${req.params.email} not found`);
      throw new NotFoundError("User not found"); //
    }
    logger.info(`User with email ${req.params.email} retrieved successfully`);
    HttpRes.Success(res, email);
  } catch (error) {
    logger.error("Error retrieving user by email:", error);
    next(error); // Pasa el error al manejador de errores
  }
};

const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, day_creation, password, role } =
      req.body;
    if (!firstName || !lastName || !email || !password) {
      logger.warn("Incomplete values for user creation");
      throw new ValidatorError("Incomplete values for user creation");
    }
    const userEmail = await usersServices.getUserBy({ email });

    if (userEmail) {
      // verifico si el usuario ya existe
      logger.warn(`User with email ${userEmail} already exists`);
      throw new BadRequestError("User already exists"); // Pasa el error al manejador de errores
    }

    const userData = {
      firstName,
      lastName,
      email,
      phone,
      day_creation: day_creation || new Date().toISOString(),
      password,
      role: role || "user",
    };
    const result = await usersServices.createUser(userData);
    HttpRes.Created(res, result);
  } catch (error) {
    logger.error("Error creating user:", error);
    next(error); // Pasa el error al manejador de errores
  }
};

const updateUser = async (req, res) => {
  try {
    const { id_user } = req.params; // Obtiene el id_user de los parámetros de la URL
    const user = await usersServices.getUserBy({ id_user });
    if (!user) {
      logger.warn(`User with id_user ${id_user} not found`);
      throw new NotFoundError("User not found"); // Pasa el error al manejador de errores
    }
    const updatedData = req.body; // Obtiene los datos actualizados del body de la peticion
    const result = await usersServices.updateUser(id_user, updatedData);
    HttpRes.Success(res, result); // Usa el método Success de la clase HttpRes para enviar la respuesta
  } catch (error) {
    logger.error("Error updating user:", error);
    next(error); // Pasa el error al manejador de errores
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id_user } = req.params; // Obtiene el id_user de los parámetros de la URL
    const user = await usersServices.getUserBy({ id_user });
    if (!user) {
      logger.warn(`User with id_user ${id_user} not found`);
      throw new NotFoundError("User not found"); // Pasa el error al manejador de errores
    }
    await usersServices.deleteUser(id_user); // Llama al servicio para eliminar el usuario
    HttpRes.Deleted(res, `User with id_user ${id_user} deleted successfully`); // Usa el método Deleted de la clase HttpRes para enviar la respuesta
  } catch (error) {
    logger.error("Error deleting user:", error);
    next(error); // Pasa el error al manejador de errores
  }
};

const updatePassword = async (req, res) => {
  try {
    const { id_user } = req.params; // Obtiene el id_user de los parámetros de la URL
    const user = await usersServices.getUserBy({ id_user });
    if (!user) {
      logger.warn(`User with id_user ${id_user} not found`);
      throw new NotFoundError("User not found"); // Pasa el error al manejador de errores
    }
    const { password } = req.body; // Obtiene la nueva contraseña del body de la peticion
    if (!password) {
      logger.warn("Password is required for update");
      throw new ValidatorError("Password is required for update"); // Pasa el error al manejador de errores
    }
    const result = await usersServices.updatePassword(id_user, password); // Llama al servicio para actualizar la contraseña
    HttpRes.Success(res, result); // Usa el método Success de la clase HttpRes para enviar la respuesta
  } catch (error) {
    logger.error("Error updating password:", error);
    next(error); // Pasa el error al manejador de errores
  }
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  updatePassword,
};
