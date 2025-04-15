import BaseRouter from "./BaseRouter.js";
import usersController from "../controllers/users.controller.js";

class UsersRouter extends BaseRouter { // creo una clase llamada UsersRouter que extiende de BaseRouter

    init() {
        this.get('/', ['PUBLIC'], usersController.getUsers); /* Consultar todos los usuarios */
        this.get('/:id_user', ['PUBLIC'], usersController.getUserById); /* Consultar usuario */
        this.post('/', ['PUBLIC'], usersController.createUser); /* Crear usuario */
        this.put('/:id_user', ['ADMIN'], usersController.updateUser); /* Actualizar usuario */
        this.delete('/:id_user', ['ADMIN'], usersController.deleteUser); /* Eliminar usuario */
        this.put('/:id_user/password', ['USER', 'ADMIN'], usersController.updatePassword); /* Cambiar contraseña */
    }
};

const usersRouter = new UsersRouter(); // instancio un objeto de UsersRouter
export default usersRouter.getRouter(); // exporto una instancia de UsersRouter().getRouter() para que sea un objeto instanciado y no una clase.