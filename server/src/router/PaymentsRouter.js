import BaseRouter from "./BaseRouter.js";
import paymentController from "../controllers/payment.controller.js";
import { passportCall } from "../middlewares/passportCall.js";

class PaymentsRouter extends BaseRouter {
  init() {
    // POST /api/payments/create - Crear un nuevo pago
    this.post('/create', ['PUBLIC', 'USER'], passportCall('current'), paymentController.createPayment);

    // GET /api/payments/:id_payment - Obtener un pago por ID
    this.get('/:id_payment', ['PUBLIC', 'USER'], passportCall('current'), paymentController.getPaymentById);

    // GET /api/payments/user/:id_user - Obtener pagos por usuario
    this.get('/user/:id_user', ['PUBLIC', 'USER'], passportCall('current'), paymentController.getPaymentsByUserId);

    // GET /api/payments/shift/:id_shift - Obtener pagos por turno
    this.get('/shift/:id_shift', ['PUBLIC', 'USER'], passportCall('current'), paymentController.getPaymentsByShiftId);

    // PUT /api/payments/:id_payment/status - Actualizar estado de pago (solo admin)
    this.put('/:id_payment/status', ['ADMIN'], passportCall('current'), paymentController.updatePaymentStatus);

    // POST /api/payments/:id_payment/confirm - Confirmar un pago
    this.post('/:id_payment/confirm', ['PUBLIC', 'USER'], passportCall('current'), paymentController.confirmPayment);

    // GET /api/payments - Obtener todos los pagos (solo admin)
    this.get('/', ['ADMIN'], passportCall('current'), paymentController.getAllPayments);
  }
}

const paymentsRouter = new PaymentsRouter();
export default paymentsRouter.getRouter(); 