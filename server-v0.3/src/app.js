//import './utils/listeners.js'; // Importa el archivo listeners.js para que se ejecuten los listeners
import express from "express"; // importo express desde la carpeta node_modules
import ShiftsRouter from "./router/ShiftsRouter.js"; // importo ShiftsRouter desde la carpeta router/shifts.router.js
import UsersRouter from "./router/UsersRouter.js"; // importo UsersRouter desde la carpeta router/users.router.js
import SessionsRouter from "./router/SessionsRouter.js"; // importo SessionRouter desde la carpeta router/sessions.router.js
import config from "./config/config.env.js"; // importo config desde la carpeta config/config.env.js
import initializePassportConfig from "./config/passport.config.js"; // importo initializePassportConfig desde la carpeta config/passport.config.js
import passport from "passport"; // importo passport desde la carpeta node_modules.
import cookieParser from "cookie-parser"; // importo cookieParser desde la carpeta node_modules.
import cors from "cors"; // Importa el paquete cors desde la carpeta node_modules.
import { handlerError } from "./middlewares/errorHandler.js";
//import helmet from "helmet";

// Middleware de Helmet
const app = express(); // coloco al metodo express en una constante llamada app.

//
app.use(express.json()); // uso el metodo json de express, para que el servidor pueda leer json.
app.use(cookieParser()); // uso el metodo cookieParser de express.
const corsOptions = {
  origin: "http://localhost:5173", // Reemplaza con la URL de tu frontend
  credentials: true, // Permite el envío de cookies
};
app.use(cors(corsOptions)); // Usa el middleware cors con opciones personalizadas

const PORT = config.app.PORT; // creo una constante llamada PORT qur tiene el valor de process.env.PORT o 8080.

app.listen(PORT, () => {
  // creo una constante llamada server que escucha en el puerto 8080
  console.log(`server is running on port ${PORT}`);
});

initializePassportConfig(); // inicializo el passport.
app.use(passport.initialize()); // uso el metodo initialize de passport.

app.use("/api/shifts", ShiftsRouter); // ruta api/shifts, que usa el ShiftsRouter de la carpeta router/shifts.router.js
app.use("/api/users", UsersRouter); // ruta api/users, que usa el UsersRouter de la carpeta router/users.router.js
app.use("/api/sessions", SessionsRouter); // ruta api/sessions, que usa el SessionRouter de la carpeta router/sessions.router.js

app.use(handlerError); // uso el metodo handlerError de la carpeta middlewares/errorHandler.js