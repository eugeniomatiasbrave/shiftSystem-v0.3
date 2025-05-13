// BaseRouter.js es un custom router que se encarga de manejar las rutas de la aplicacion.
// Es un router acoplado a mis necesidades, y un modelo estandarizado a nivel proyecto.
// Nos ayuda a estandarizar nuestras peticiones, el uso del router, estandarizar las respuestas, los errores, los mensajes de error.
import { Router } from "express";
import { passportCall } from "../middlewares/passportCall.js";
import { executePolicies } from "../middlewares/policies.js";
import logger from "../config/log4js.config.js";

export default class BaseRouter {
	constructor(){
		this.router = Router();
		this.init();
	}

	init(){};

	getRouter(){
		return this.router;
	}

	get(path,policies,...callbacks){ // ...callback es un spread operator, no se cuantos callbacks voy a recibir. Pero estos callbacks estan descontextualizados
		if(!policies || !Array.isArray(policies)) throw new Error("Policies required for endpoint" + path); // protejo el codigo de que no me pasen un policies que no sea un array cundo desarrollo el codigo.
		this.router.get(path, passportCall('current'),executePolicies(policies), this.applyCallbacks(callbacks));
	}
	post(path,policies,...callbacks){ // ...callback es un spread operator, no se cuantos callbacks voy a recibir. Pero estos callbacks estan descontextualizados
		if(!policies || !Array.isArray(policies)) throw new Error("Policies required for endpoint" + path); // protejo el codigo de que no me pasen un policies que no sea un array cundo desarrollo el codigo.
		this.router.post(path, passportCall('current'),executePolicies(policies), this.applyCallbacks(callbacks));
	}
	put(path,policies,...callbacks){ // ...callback es un spread operator, no se cuantos callbacks voy a recibir. Pero estos callbacks estan descontextualizados
		if(!policies || !Array.isArray(policies)) throw new Error("Policies required for endpoint" + path); // protejo el codigo de que no me pasen un policies que no sea un array cundo desarrollo el codigo.
		this.router.put(path, passportCall('current'),executePolicies(policies), this.applyCallbacks(callbacks));
	}
	delete(path,policies,...callbacks){ // ...callback es un spread operator, no se cuantos callbacks voy a recibir. Pero estos callbacks estan descontextualizados
		if(!policies || !Array.isArray(policies)) throw new Error("Policies required for endpoint" + path); // protejo el codigo de que no me pasen un policies que no sea un array cundo desarrollo el codigo.
		this.router.delete(path, passportCall('current'),executePolicies(policies), this.applyCallbacks(callbacks));
	}

	
	// Ejecuto los middlewares dento de un contexto compartido, conecto y relaciono contextualizando los callbacks
	applyCallbacks(callbacks){
		return callbacks.map((callback) => async (...params) => {
			//dentro ya tiene lo paramas req, res, next
			try{
				await callback.apply(this,params);// aplico el callback con los parametros que recibo
			}
			catch(error){
				logger.error(`Error en ruta ${params[0].originalUrl}: ${error.name} - ${error.message}`);
				
				// Determinar el código de estado HTTP apropiado basado en el tipo de error
				let statusCode = 500;
				if (error.name.includes('BadRequest')) statusCode = 400;
				if (error.name.includes('Unauthorized')) statusCode = 401;
				if (error.name.includes('Forbidden')) statusCode = 403;
				if (error.name.includes('NotFound')) statusCode = 404;
				if (error.name.includes('Conflict')) statusCode = 409;
				
				params[1].status(statusCode).json({ 
					status: statusCode, 
					message: error.message || 'Error en el servidor',
					error: error.name
				});
			} // params[1] es el res
		})
	}	
}