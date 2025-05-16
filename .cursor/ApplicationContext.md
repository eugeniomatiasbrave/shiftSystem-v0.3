# Shift Management System - Contexto de la Aplicación

## Resumen del Proyecto

El "Shift Management System" es una plataforma digital diseñada para la gestión eficiente de turnos y citas en el ámbito de la salud. La aplicación está orientada a profesionales de la salud (psicólogos, terapeutas, médicos) que desean ofrecer sus servicios de consulta mediante un sistema de citas disponibles en la web.

## Modelo de Negocio

La aplicación se centra en proporcionar una plataforma eficiente y accesible para la gestión de turnos en el ámbito de la salud. El sistema está diseñado para un profesional (administrador) que ofrece un servicio con su calendario único de turnos/citas a usuarios (pacientes).

### Objetivos Principales

- Proporcionar una solución eficiente para la gestión de turnos, incluyendo reserva, pagos, cancelación, reprogramación y visualización de los turnos realizados y programados.
- Facilitar la interacción de los usuarios con la aplicación a través de una interfaz amigable e intuitiva.
- Implementar un sistema robusto de backend que garantice la seguridad y la integridad de los datos.

## Actores Principales

### Profesional de la Salud (Admin)

- **Rol**: Psicólogo, terapeuta o médico que ofrece servicios de consulta mediante citas disponibles en la web.
- **Capacidades**:
  - Visualizar su disponibilidad y calendario
  - Gestionar los pagos recibidos
  - Administrar las reservas de turnos
  - Mantener un registro de citas pasadas y futuras
  - Supervisar la plataforma y gestionar usuarios
  - Asegurar el correcto funcionamiento del sistema

### Pacientes (User)

- **Rol**: Usuarios que buscan servicios de salud.
- **Capacidades**:
  - Registrarse en la plataforma
  - Buscar citas disponibles
  - Pagar por los servicios
  - Reservar turnos
  - Cancelar o reprogramar citas
  - Ver historial de citas anteriores
  - Ver historial de Pagos

## Propuesta de Valor

- **Eficiencia**: Facilita la gestión de turnos, reduciendo el tiempo y esfuerzo tanto para los profesionales como para los pacientes.
- **Accesibilidad**: Permite a los pacientes acceder a servicios de salud desde cualquier lugar y en cualquier momento.
- **Seguridad**: Implementa medidas de seguridad robustas para proteger la información sensible de los usuarios.

## Stack Tecnológico

### Frontend

- **Framework**: SvelteKit
- **Build Tool**: Vite
- **CSS**: Tailwind CSS, Daisy UI
- **HTTP Client**: Axios
- **Otras librerías**: Flatpickr, Iconify-icon, SweetAlert2, JWT

#### Dependencias Frontend

```json
{
  "devDependencies": {
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
  },
  "dependencies": {
    "@sveltejs/adapter-node": "^5.2.4",
    "axios": "^1.8.4",
    "daisyui": "^4.12.10",
    "dotenv": "^16.4.5",
    "flatpickr": "^4.6.13",
    "iconify-icon": "^2.1.0",
    "jsonwebtoken": "^9.0.2",
    "sweetalert2": "^11.14.1"
  }
}
```

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (principal) y mongoDB (sin aplicar)
- **ORM**: Sequelize (principal)
- **ODM**: Mongoose (sin aplicar)
- **Autenticación**: JWT (JSON Web Tokens), Passport.js
- **Validación**: Joi
- **Testing**: chaid, jest, mocha, supertest
- **Documentation**: swagger

#### Dependencias Backend

```json
{
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
}
```

## Base de Datos

- **Nombre**: shiftapi_dev
- **Tipo**: MySQL (principal)

### Estructura de Tablas

1. **Users**: Almacena información de los usuarios (nombre, correo, rol).
2. **Shifts**: Almacena información sobre los turnos (fecha, hora, estado, referencia al usuario).
3. **Payments**: Almacena y registra los pagos.

### Estado Actual

- El calendario ya está creado en la base de datos MySQL.

## Notas Adicionales

- Las dependencias pueden ser modificadas según sea necesario para cumplir con los requisitos del proyecto.
- Para más detalles sobre las tareas de implementación específicas, consultar el archivo `/docs/`.

## Repositorios

- Frontend: @client
- Backend: @server
