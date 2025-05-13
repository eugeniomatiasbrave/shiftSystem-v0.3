import { shiftsServices, paymentServices } from "../services/indexRepositories.js"; // import the productsService from the indexRepositories.js file
import logger from "../config/log4js.config.js"; // import the logger from the log4js.config.js file
import { BadRequestError, ForbiddenError, NotFoundError } from "../utils/customError.js"; // import the custom errors
import HttpRes from "../utils/httpResponse.js"; // Importa la clase de respuesta HTTP

// /api/shifts); Consultar todos los turnos .....ok
const getShifts = async (req, res, next) => {
  try {
    const shifts = await shiftsServices.getShifts();
    HttpRes.Success(res, shifts);
  } catch (error) {
    logger.error("Error retrieving shifts:", error);
    next(error);
  }
};

// /api/shifts/user/${id_user}; Consultar turnos por usuario .....ok
const getShiftsByUser = async (req, res, next) => {
  try {
    const { id_user } = req.params;
    const shifts = await shiftsServices.getShiftsByUser(id_user);
    HttpRes.Success(res, shifts);
  } catch (error) {
    logger.error("Error retrieving shifts by user:", error);
    next(error);
  }
};

// /api/shifts/reserve/:id_shift; Reservar un turno...ok
const reserveShift = async (req, res, next) => {
  try {
    const { id_shift } = req.params; // ID del turno a reservar
    const { id_user } = req.body; // ID del usuario que reserva el turno

    // Verificar que el turno existe y está disponible
    const shift = await shiftsServices.getShiftById(id_shift);
    if (!shift) {
      logger.warn(`Shift with id_shift ${id_shift} not found`);
      throw new BadRequestError("Shift not found");
    }
    // Verificar que el turno está disponible
    if (shift.status !== "available") {
      logger.warn(`Shift with id_shift ${id_shift} is not available`);
      throw new BadRequestError("Shift is not available for reservation");
    }

    const updatedShift = {
      id_user,
      status: "reserved",
    };
    const result = await shiftsServices.updateShift(id_shift, updatedShift);

    HttpRes.Success(res, result); // Respuesta exitosa
  } catch (error) {
    logger.error("Error reserving shift:", error);
    next(error);
  }
};

// /api/shifts/cancel/:id_shift; Cancelar un turno
const cancelShift = async (req, res, next) => {
  try {
    const { id_shift } = req.params; // ID del turno a cancelar
    const { id_user } = req.body; // ID del usuario que solicita la cancelación

    // Convertir id_user a numérico para evitar problemas de comparación de tipos
    const numericUserId = Number(id_user);

    // Obtener el turno por su ID
    const shift = await shiftsServices.getShiftById(id_shift); 

    // Verificar si el turno existe
    if (!shift) { 
      throw new BadRequestError("Shift not found");
    }

    // Añadir logs para depuración
    logger.info(`Cancelando turno: ID: ${id_shift}, Estado: ${shift.status}, Usuario del turno: ${shift.id_user}, Usuario solicitante: ${numericUserId}`);
    
    // Verificar que el turno está reservado por el usuario
    if (shift.status !== "reserved") {
      throw new BadRequestError("Shift is not in reserved status");
    }
    
    // Verificar que el turno no esté dentro de las 24 horas
    const shiftDateTime = new Date(`${shift.date}T${shift.time}`);
    const currentDateTime = new Date();
    const cancelationLimit = new Date(currentDateTime.getTime() + 24 * 60 * 60 * 1000);

    if (shiftDateTime < cancelationLimit) {
      throw new ForbiddenError("Cannot cancel a shift within 24 hours of its scheduled time");
    }
  
    // Actualizar el estado del turno a "available" y quitar la referencia al usuario
    const updatedShift = {
      id_user: null,
      status: "available",
    };
    const result = await shiftsServices.updateShift(id_shift, updatedShift);

    HttpRes.Success(res, result);
  } catch (error) {
    logger.error("Error canceling shift:", error);
    next(error);
  }
};



const getShiftById = async (req, res, next) => {
  // Obtiene un turno por su id_shift
  try {
    const { id_shift } = req.params; // Obtiene el id_shift de los parámetros de la URL
    const shift = await shiftsServices.getShiftById(id_shift);
    if (!shift) {
      logger.warn(`Shift with id_shift ${id_shift} not found`);
      throw new BadRequestError("Shift not found");
    }
    HttpRes.Success(res, shift);
  } catch (error) {
    logger.error("Error retrieving shift by id_shift:", error);
    next(error);
  }
};


const getShiftByDate = async (req, res, next) => {
  // Obtiene un turno por su fecha
  try {
    const { date } = req.params;
    const shifts = await shiftsServices.getShiftsByDate(date);
    HttpRes.Success(res, shifts);
  } catch (error) {
    logger.error("Error retrieving shifts by date:", error);
    next(error);
  }
};

const createShift = async (req, res, next) => {
  // Crea un nuevo turno excepcionalmente, con proposito en caso que no se generen automaticamente
  try {
    const { id_user, date, time, status } = req.body;
    if (!date || !time || !status) {
      logger.warn("Incomplete values for shift creation");
      throw new BadRequestError("Incomplete values for shift creation");
    }
    const shiftData = {
      date,
      time,
      status: status ?? "available", // Asigna "available" por defecto si no se proporciona.
      id_user,
    };
    const newShift = await shiftsServices.createShift(shiftData);
    HttpRes.Created(res, newShift);
  } catch (error) {
    logger.error("Error creating shift:", error);
    next(error);
  }
};

const updateShift = async (req, res, next) => {
  // Actualiza un turno existente
  try {
    const { id_shift } = req.params;
    const updatedData = req.body;

    // Verificar que el turno existe
    const shift = await shiftsServices.getShiftById(id_shift);
    if (!shift) {
      logger.warn(`Shift with id_shift ${id_shift} not found`);
      throw new BadRequestError("Shift not found");
    }

    // No permitir actualizar turnos reservados
    if (shift.status === "reserved") {
      logger.warn(`Cannot update a reserved shift with id_shift ${id_shift}`);
      throw new BadRequestError("Cannot update a reserved shift");
    }

    const updatedShift = await shiftsServices.updateShift(
      id_shift,
      updatedData
    );
    HttpRes.Updated(res, updatedShift);
  } catch (error) {
    logger.error("Error updating shift:", error);
    next(error);
  }
};

const updateShiftStatus = async (req, res, next) => {
  // Actualiza el estado de un turno existente
  try {
    const { id_shift } = req.params;
    const { status } = req.body;

    // Validar que el estado sea válido
    const validStatuses = ["available", "reserved", "canceled"];
    if (!validStatuses.includes(status)) {
      throw new BadRequestError("Invalid status value");
    }

    // Verificar que el turno existe
    const shift = await shiftsServices.getShiftById(id_shift);
    if (!shift) {
      throw new BadRequestError("Shift not found");
    }

    // Actualizar el estado del turno
    const updatedShift = await shiftsServices.updateShift(id_shift, { status });
    HttpRes.Updated(res, updatedShift);
  } catch (error) {
    logger.error("Error updating shift status:", error);
    next(error);
  }
};


const rescheduleShift = async (req, res, next) => {
  // Reprograma un turno existente
  try {
    const { id_shift } = req.params;
    const { newDate, newTime } = req.body;

    const shift = await shiftsServices.getShiftById(id_shift);
    if (!shift || shift.status !== "reserved") {
      throw new BadRequestError("Shift cannot be rescheduled");
    }

    const updatedShift = await shiftsServices.updateShift(id_shift, {
      date: newDate,
      time: newTime,
    });
    HttpRes.Updated(res, updatedShift);
  } catch (error) {
    logger.error("Error rescheduling shift:", error);
    next(error);
  }
};

const deleteShift = async (req, res, next) => {
  // Elimina un turno existente
  try {
    const { id_shift } = req.params; // Obtiene el id_shift de los parámetros de la URL
    await shiftsServices.deleteShift(id_shift);
    HttpRes.Deleted(res);
  } catch (error) {
    logger.error("Error deleting shift:", error);
    next(error);
  }
};

// GET /api/shifts/:id_shift/payment - Obtener un turno con su pago confirmado
const getShiftWithPayment = async (req, res, next) => {
  try {
    const { id_shift } = req.params;
    
    // Obtener el turno con información de pago confirmado
    const shift = await shiftsServices.getShiftWithConfirmedPayment(id_shift);
    
    if (!shift) {
      throw new NotFoundError("Shift not found");
    }
    
    HttpRes.Success(res, shift);
  } catch (error) {
    logger.error("Error retrieving shift with payment:", error);
    next(error);
  }
};

export default {
  // export an object with all the methods
  getShifts,
  getShiftsByUser,
  reserveShift,
  cancelShift,
  getShiftById,
  getShiftByDate,
  createShift,
  updateShift,
  updateShiftStatus,
  rescheduleShift,
  deleteShift,
  getShiftWithPayment
};

// MEJORA DEL MODELO DE TURNOS:

// Reglas para cancelacion de turnos:
// 1. Los turno no pueden cancelarse si se encuentran dentro de las 24 horas de la fecha y hora del turno.
// 2. Los turnos pueden cancelarse si se encuentran fuera de las 24 horas de la fecha y hora del turno, y se les asigna nuevamente el estado de "available".

// Pago de turnos:
// 1. Se puede implementar un sistema de pago para los turnos reservados, donde el usuario debe pagar una tarifa para confirmar la reserva.


// Historial de turnos:
// 1. Se guardan los turnos cancelados para llevar un registro de los mismos.
// 2. Se guardan los turnos reservados para llevar un registro de los mismos.

// Notificaciones:
// 1. Se envian notificaciones por email al usuario cuando se reserva un turno.
// 2. Se envian notificaciones por email al usuario cuando se cancela un turno.
// 3. Se envian notificaciones por email al usuario cuando se actualiza un turno.
