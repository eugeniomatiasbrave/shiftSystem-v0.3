import BaseRouter from "./BaseRouter.js";
import usersController from "../controllers/users.controller.js";
import {passportCall} from "../middlewares/passportCall.js"; // Importo passportCall para usarlo en la ruta de login
import { userValidator } from "../middlewares/validate.js";


class UsersRouter extends BaseRouter { // creo una clase llamada UsersRouter que extiende de BaseRouter

    init() {
        // GET /api/users - Obtener todos los usuarios
        this.get('/', ['ADMIN'], passportCall('current'), usersController.getUsers);
        
        // GET /api/users/email/:email - Obtener usuario por email
        this.get('/email/:email', ['PUBLIC'], usersController.getUserByEmail);
        
        // GET /api/users/:id_user - Obtener usuario por ID
        this.get('/:id_user', ['PUBLIC'], usersController.getUserById);
        
        // POST /api/users - Crear usuario
        this.post('/', ['PUBLIC'], userValidator, usersController.createUser);
        
        // PUT /api/users/:id_user - Actualizar usuario
        this.put('/:id_user', ['USER'], passportCall('current'), userValidator, usersController.updateUser);
        
        // DELETE /api/users/:id_user - Eliminar usuario
        this.delete('/:id_user', ['ADMIN'], passportCall('current'), usersController.deleteUser);
        
        // PUT /api/users/:id_user/password - Cambiar contraseña
        this.put('/:id_user/password', ['USER', 'ADMIN'], passportCall('current'), usersController.updatePassword);
    }
};

const usersRouter = new UsersRouter(); // instancio un objeto de UsersRouter
export default usersRouter.getRouter(); // exporto una instancia de UsersRouter().getRouter() para que sea un objeto instanciado y no una clase.