import BaseRouter from "./BaseRouter.js";
import shiftController from "../controllers/shifts.controller.js";
import {passportCall} from "../middlewares/passportCall.js"; 

class ShiftsRouter extends BaseRouter {
	
	init(){
        // /api/shifts); Consultar todos los turnos ..................................................................OK
		this.get('/',['PUBLIC','USER'], passportCall('current'),shiftController.getShifts); 
        // /api/shifts/user/${id_user}; Consultar turnos por usuario .................................................OK
        this.get('/user/:id_user',['PUBLIC','USER'], passportCall('current'),shiftController.getShiftsByUser); 
        // /api/shifts/reserve/:id_shift; Reservar un turno ..........................................................OK
        this.put('/reserve/:id_shift', ['PUBLIC','USER'],passportCall('current'), shiftController.reserveShift); 
        // /api/shifts/cancel/:id_shift; Cancelar un turno ...........................................................
        this.put('/cancel/:id_shift', ['PUBLIC','USER'],passportCall('current'), shiftController.cancelShift); 
        // /api/shifts/:id_shift/payment; Obtener un turno con su pago confirmado ...................................
        this.get('/:id_shift/payment', ['PUBLIC','USER'], passportCall('current'), shiftController.getShiftWithPayment);

        /* Consultar un turno */
        this.get('/:id_shift',['PUBLIC','USER'], passportCall('current'),shiftController.getShiftById); 
        this.get('/:date', ['PUBLIC','USER'], passportCall('current'),shiftController.getShiftByDate ); /* Consultar turnos por fecha */
        this.post('/', ['ADMIN'], shiftController.createShift); /* Crear un turno */
        this.put('/:id_shift', ['ADMIN'], shiftController.updateShift); /* Actualizar turno */
        this.put('/reschedule/:id_shift', ['USER'], shiftController.rescheduleShift); /* Reprogramar un turno */
        this.delete('/:id_shift', ['ADMIN'], shiftController.deleteShift); /* Eliminar turno */
        this.put('/status/:id_shift', ['ADMIN'], shiftController.updateShiftStatus); /* Actualizar estado del turno */
	}
}

const shiftsRouter = new ShiftsRouter();
export default shiftsRouter.getRouter(); // exporto una instancia de ProductsRouter().getRouter() para que sea un objeto instanciado y no una clase.

