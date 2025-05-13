import { paymentServices, shiftsServices } from "../services/indexRepositories.js";
import logger from "../config/log4js.config.js";
import { BadRequestError, NotFoundError } from "../utils/customError.js";
import HttpRes from "../utils/httpResponse.js";

// POST /api/payments/create - Crear un nuevo pago
const createPayment = async (req, res, next) => {
  try {
    const { id_shift, id_user, amount, payment_method, currency = "ARS" } = req.body;

    // Validar datos requeridos
    if (!id_shift || !id_user || !amount || !payment_method) {
      throw new BadRequestError("Missing required payment information");
    }

    // Verificar que el turno existe y está en estado correcto
    const shift = await shiftsServices.getShiftById(id_shift);
    if (!shift) {
      throw new NotFoundError("Shift not found");
    }

    // Verificar que el turno no esté ya pagado
    if (shift.status === "reserved") {
      throw new BadRequestError("This shift is already paid and reserved");
    }

    // Validar que el usuario que solicita el pago coincide con el usuario del turno o es administrador
    if (shift.id_user && shift.id_user !== parseInt(id_user)) {
      throw new BadRequestError("User mismatch");
    }

    // Crear objeto de pago
    const paymentData = {
      id_shift,
      id_user,
      amount,
      currency,
      payment_method,
      payment_status: "pending",
      payment_details: req.body.payment_details || null
    };

    // Guardar el pago en la base de datos
    const newPayment = await paymentServices.createPayment(paymentData);

    // Actualizar el estado del turno a "pending_payment"
    await shiftsServices.updateShift(id_shift, {
      id_user: id_user,
      status: "pending_payment"
    });

    // Responder con el pago creado
    HttpRes.Created(res, newPayment);
  } catch (error) {
    logger.error("Error creating payment:", error);
    next(error);
  }
};

// GET /api/payments/:id_payment - Obtener un pago por ID
const getPaymentById = async (req, res, next) => {
  try {
    const { id_payment } = req.params;
    const payment = await paymentServices.getPaymentById(id_payment);
    
    if (!payment) {
      throw new NotFoundError("Payment not found");
    }
    
    HttpRes.Success(res, payment);
  } catch (error) {
    logger.error("Error retrieving payment:", error);
    next(error);
  }
};

// GET /api/payments/user/:id_user - Obtener pagos por usuario
const getPaymentsByUserId = async (req, res, next) => {
  try {
    const { id_user } = req.params;
    const payments = await paymentServices.getPaymentsByUserId(id_user);
    HttpRes.Success(res, payments);
  } catch (error) {
    logger.error("Error retrieving payments by user:", error);
    next(error);
  }
};

// GET /api/payments/shift/:id_shift - Obtener pagos por turno
const getPaymentsByShiftId = async (req, res, next) => {
  try {
    const { id_shift } = req.params;
    const payments = await paymentServices.getPaymentsByShiftId(id_shift);
    HttpRes.Success(res, payments);
  } catch (error) {
    logger.error("Error retrieving payments by shift:", error);
    next(error);
  }
};

// PUT /api/payments/:id_payment/status - Actualizar estado de pago
const updatePaymentStatus = async (req, res, next) => {
  try {
    const { id_payment } = req.params;
    const { status } = req.body;
    
    // Validar que el estado sea válido
    const validStatuses = ["pending", "completed", "failed", "refunded"];
    if (!validStatuses.includes(status)) {
      throw new BadRequestError("Invalid payment status");
    }
    
    // Obtener el pago actual
    const payment = await paymentServices.getPaymentById(id_payment);
    if (!payment) {
      throw new NotFoundError("Payment not found");
    }
    
    // Actualizar el estado del pago
    const updatedPayment = await paymentServices.updatePaymentStatus(id_payment, status);
    
    // Si el pago ha sido completado, actualizar el estado del turno a "reserved"
    // y registrar el id_payment_confirmed
    if (status === "completed") {
      await shiftsServices.updateShift(payment.id_shift, {
        status: "reserved",
        id_payment_confirmed: id_payment
      });
    }
    
    // Si el pago ha fallado o ha sido reembolsado, actualizar el turno a "available"
    // y quitar cualquier referencia al pago confirmado
    if (status === "failed" || status === "refunded") {
      await shiftsServices.updateShift(payment.id_shift, {
        id_user: null,
        status: "available",
        id_payment_confirmed: null
      });
    }
    
    HttpRes.Updated(res, updatedPayment);
  } catch (error) {
    logger.error("Error updating payment status:", error);
    next(error);
  }
};

// POST /api/payments/:id_payment/confirm - Confirmar un pago (ej: cuando se recibe webhook del procesador de pagos)
const confirmPayment = async (req, res, next) => {
  try {
    const { id_payment } = req.params;
    const { transaction_id, payment_details } = req.body;
    
    // Verificar que el pago existe
    const payment = await paymentServices.getPaymentById(id_payment);
    if (!payment) {
      throw new NotFoundError("Payment not found");
    }
    
    // Actualizar la información de transacción
    await paymentServices.updatePaymentTransaction(id_payment, transaction_id, payment_details);
    
    // Actualizar el estado a "completed"
    const updatedPayment = await paymentServices.updatePaymentStatus(id_payment, "completed");
    
    // Actualizar el estado del turno a "reserved" y registrar el id_payment_confirmed
    await shiftsServices.updateShift(payment.id_shift, {
      status: "reserved",
      id_payment_confirmed: id_payment
    });
    
    HttpRes.Updated(res, updatedPayment);
  } catch (error) {
    logger.error("Error confirming payment:", error);
    next(error);
  }
};

// GET /api/payments - Obtener todos los pagos (admin)
const getAllPayments = async (req, res, next) => {
  try {
    const payments = await paymentServices.getAllPayments();
    HttpRes.Success(res, payments);
  } catch (error) {
    logger.error("Error retrieving all payments:", error);
    next(error);
  }
};

export default {
  createPayment,
  getPaymentById,
  getPaymentsByUserId,
  getPaymentsByShiftId,
  updatePaymentStatus,
  confirmPayment,
  getAllPayments
};


