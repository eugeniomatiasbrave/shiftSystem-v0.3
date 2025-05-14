import BaseRouter from "./BaseRouter.js";
import shiftController from "../controllers/shifts.controller.js";
import { passportCall } from "../middlewares/passportCall.js";
import { shiftValidator } from "../middlewares/validate.js";

class ShiftsRouter extends BaseRouter {
	
	init() {
        // GET /api/shifts - Obtener todos los turnos
		this.get('/', ['PUBLIC', 'USER'], passportCall('current'), shiftController.getShifts);
        
        // GET /api/shifts/user/:id_user - Obtener turnos por usuario
        this.get('/user/:id_user', ['PUBLIC', 'USER'], passportCall('current'), shiftController.getShiftsByUser);
        
        // GET /api/shifts/:id_shift - Obtener turno por ID
        this.get('/:id_shift', ['PUBLIC', 'USER'], passportCall('current'), shiftController.getShiftById);
        
        // GET /api/shifts/:id_shift/payment - Obtener turno con su pago
        this.get('/:id_shift/payment', ['PUBLIC', 'USER'], passportCall('current'), shiftController.getShiftWithPayment);
        
        // GET /api/shifts/date/:date - Obtener turnos por fecha
        this.get('/date/:date', ['PUBLIC', 'USER'], passportCall('current'), shiftController.getShiftByDate);
        
        // POST /api/shifts - Crear turno
        this.post('/', ['ADMIN'], passportCall('current'), shiftValidator, shiftController.createShift);
        
        // PUT /api/shifts/:id_shift - Actualizar turno
        this.put('/:id_shift', ['ADMIN'], passportCall('current'), shiftValidator, shiftController.updateShift);
        
        // PUT /api/shifts/reserve/:id_shift - Reservar turno
        this.put('/reserve/:id_shift', ['PUBLIC', 'USER'], passportCall('current'), shiftController.reserveShift);
        
        // PUT /api/shifts/cancel/:id_shift - Cancelar turno
        this.put('/cancel/:id_shift', ['PUBLIC', 'USER'], passportCall('current'), shiftController.cancelShift);
        
        // PUT /api/shifts/reschedule/:id_shift - Reprogramar turno
        this.put('/reschedule/:id_shift', ['USER'], passportCall('current'), shiftController.rescheduleShift);
        
        // PUT /api/shifts/status/:id_shift - Actualizar estado del turno
        this.put('/status/:id_shift', ['ADMIN'], passportCall('current'), shiftController.updateShiftStatus);
        
        // DELETE /api/shifts/:id_shift - Eliminar turno
        this.delete('/:id_shift', ['ADMIN'], passportCall('current'), shiftController.deleteShift);
        
        // GET /api/shifts/availability/:date - Verificar disponibilidad por fecha
        this.get('/availability/:date', ['PUBLIC', 'USER'], shiftController.getAvailability);
	}
}

const shiftsRouter = new ShiftsRouter();
export default shiftsRouter.getRouter();

