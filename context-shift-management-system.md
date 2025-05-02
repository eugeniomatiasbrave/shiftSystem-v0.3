
# Modelo de Negocio

El modelo de negocio de la aplicación "Shift Management System" se centra en proporcionar una plataforma eficiente y accesible para la gestión de turnos en el ámbito de la salud.
La app es desarrollada para un profecional (administrador), un servicio con su calendario unico, que ofrece turnos/ citas a usuarios (pacientes)
Los principales actores en este modelo son:
Profesional de la Salud: Psicólogo , terapeuta o Medico que ofrece el servicio de consulta. Pueden gestionar su disponibilidad, aceptar reservas y mantener un registro de sus citas.
Pacientes: Usuarios que buscan servicios de salud. Pueden registrarse, buscar la cita, reservar, cancelar y reprogramar citas de manera sencilla.
Administradores: Encargados de supervisar la plataforma, gestionar usuarios y asegurar el correcto funcionamiento del sistema. El administrado es el profecional
Propuesta de Valor
Eficiencia: Facilita la gestión de turnos, reduciendo el tiempo y esfuerzo tanto para los profesionales como para los pacientes.
Accesibilidad: Permite a los pacientes acceder a servicios de salud desde cualquier lugar y en cualquier momento.
Seguridad: Implementa medidas de seguridad robustas para proteger la información sensible de los usuarios.
Tecnologías Implicadas
Frontend:
SvelteKit: Para construir interfaces de usuario reactivas y dinámicas.
Vite: Para un entorno de desarrollo rápido y eficiente.
Tailwind CSS: Para un diseño de interfaz de usuario moderno y responsivo.
Axios: Para realizar peticiones HTTP al backend.
Estas las dependencias del front:
devDependencies:
"@sveltejs/adapter-auto": "^3.0.0",
"@sveltejs/kit": "^2.0.0",
"@sveltejs/vite-plugin-svelte": "^3.0.0",
"@types/eslint": "^9.6.0",
"autoprefixer": "^10.4.20",
"eslint": "^9.0.0",
"eslint-config-prettier": "^9.1.0",
"eslint-plugin-svelte": "^2.36.0",
"globals": "^15.0.0",
"postcss": "^8.4.47",
"prettier": "^3.1.1",
"prettier-plugin-svelte": "^3.1.2",
"svelte": "^4.2.7",
"tailwindcss": "^3.4.13",
"vite": "^5.4.8"
"type": "module",
"dependencies":
"@sveltejs/adapter-node": "^5.2.4",
"axios": "^1.8.4",
"daisyui": "^4.12.10",
"dotenv": "^16.4.5",
"flatpickr": "^4.6.13",
"iconify-icon": "^2.1.0",
"jsonwebtoken": "^9.0.2",
"sweetalert2": "^11.14.1"
Backend:
Node.js: Entorno de ejecución para JavaScript en el servidor, permitiendo un desarrollo ágil.
Express: Framework para construir APIs RESTful que gestionan las operaciones CRUD.
MySQL: Sistema de gestión de bases de datos relacional para almacenar datos de usuarios y turnos, utilizando Sequelize como ORM.
Autenticación y Autorización: Implementación de JWT (JSON Web Tokens) para asegurar el acceso a la aplicación. Estrategias de autenticacion y autorizacion con Passport.js
Estas son las dependecias en el backend de mi proyecto:
"dependencies": {
    "bcrypt": "^5.1.1",
    "commander": "^13.1.0",
    "connect-mongo": "^5.1.0",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "date-fns": "^4.1.0",
    "date-fns-tz": "^3.2.0",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "helmet": "^8.1.0",
    "joi": "^17.13.3",
    "jsonwebtoken": "^9.0.2",
    "log4js": "^6.9.1",
    "mongoose": "^8.10.0",
    "mysql2": "^3.12.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "sequelize": "^6.32.1"
  },
  "devDependencies": {
    "@faker-js/faker": "^9.6.0",
    "artillery": "^2.0.21",
    "chai": "^5.2.0",
    "jest": "^29.7.0",
    "mocha": "^11.1.0",
    "nodemon": "^3.1.9",
    "sinon": "^20.0.0",
    "supertest": "^7.1.0"
  }
Base de Datos:
Estructura de Tablas:
Users: Almacena información de los usuarios (nombre, correo, rol).
Shifts: Almacena información sobre los turnos (fecha, hora, estado, referencia al usuario).
Ya tengo creado el calendario en la base Mysql
Objetivos del Proyecto
Proporcionar una solución eficiente para la gestión de turnos, incluyendo reserva, cancelación y reprogramación.
Facilitar la interacción de los usuarios con la aplicación a través de una interfaz amigable.
Implementar un sistema robusto de backend que garantice la seguridad y la integridad de los datos.

Las dependecias o devdependencies pieden agregarse nuevas o quitarse las existentes, no son estrictas de usar.
