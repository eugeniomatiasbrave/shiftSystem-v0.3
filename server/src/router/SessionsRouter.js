import BaseRouter from "./BaseRouter.js";
import sessionsController from "../controllers/sessions.controller.js";
import {passportCall } from "../middlewares/passportCall.js";

class SessionRouter extends BaseRouter {
	
	init(){
		this.post('/register', ['PUBLIC'], passportCall('register'), sessionsController.register);
        this.post('/login', ['PUBLIC'],  passportCall('login'), sessionsController.login);
        this.post('/logout', ['USER','ADMIN'], sessionsController.logout);
		this.get('/current', ['USER','ADMIN'], passportCall('current'),sessionsController.current); // podra tener respuesta el publico como  aquellos con rol user.
	}
}

const sessionRouter = new SessionRouter();
export default sessionRouter.getRouter();