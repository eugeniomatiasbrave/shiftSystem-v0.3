import BaseRouter from "./BaseRouter.js";
import shiftController from "../controllers/shifts.controller.js";
import {passportCall} from "../middlewares/passportCall.js"; 

class ShiftsRouter extends BaseRouter {
	
	init(){
		this.get('/',['PUBLIC','USER'], passportCall('current'),shiftController.getShifts); /* Consultar todos los turnos */
        this.get('/:id_shift',['PUBLIC','USER'], passportCall('current'),shiftController.getShiftById); /* Consultar un turno */
        this.get('/:date', ['PUBLIC','USER'], passportCall('current'),shiftController.getShiftByDate ); /* Consultar turnos por fecha */
        this.get('/user/:id_user',['PUBLIC','USER'], passportCall('current'),shiftController.getShiftsByUser); /* Consultar turnos por usuario */
        this.post('/', ['ADMIN'], shiftController.createShift); /* Crear un turno */
        this.put('/:id_shift', ['ADMIN'], shiftController.updateShift); /* Actualizar turno */
        this.put('/reserve/:id_shift', ['USER'], shiftController.reserveShift); /* Reservar un turno */
        this.put('/cancel/:id_shift', ['USER'], shiftController.cancelShift); /* Cancelar un turno */
        this.put('/reschedule/:id_shift', ['USER'], shiftController.rescheduleShift); /* Reprogramar un turno */
        this.delete('/:id_shift', ['ADMIN'], shiftController.deleteShift); /* Eliminar turno */
        this.put('/status/:id_shift', ['ADMIN'], shiftController.updateShiftStatus); /* Actualizar estado del turno */
	}
}

const shiftsRouter = new ShiftsRouter();
export default shiftsRouter.getRouter(); // exporto una instancia de ProductsRouter().getRouter() para que sea un objeto instanciado y no una clase.

