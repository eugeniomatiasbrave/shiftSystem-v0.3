import BaseRouter from "./BaseRouter.js";
import sessionsController from "../controllers/sessions.controller.js";
import {passportCall} from "../middlewares/passportCall.js";
import { userValidator, loginValidator } from "../middlewares/validate.js"; // Importa el middleware de validación

class SessionRouter extends BaseRouter {
	
	init(){
		this.post('/register', ['PUBLIC'], userValidator, passportCall('register'), sessionsController.register);
        this.post('/login', ['PUBLIC'], loginValidator, passportCall('login'), sessionsController.login);
        this.post('/logout', ['USER','ADMIN'], sessionsController.logout);
		//this.get('/current', ['USER','ADMIN'], passportCall('current'), sessionsController.current); // podra tener respuesta el publico como  aquellos con rol user.
	}
}

const sessionRouter = new SessionRouter();
export default sessionRouter.getRouter();