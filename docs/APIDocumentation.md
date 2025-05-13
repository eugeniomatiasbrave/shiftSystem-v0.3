# Documentación de la API - Shift Management System

Esta documentación describe los endpoints disponibles en la API REST del Sistema de Gestión de Turnos. La API sigue principios RESTful y utiliza JWT para autenticación.

## Base URL

/api

## Convenciones

- Todos los endpoints retornan datos en formato JSON.
- Las respuestas de error incluyen un código de estado HTTP apropiado y un objeto JSON con información del error.
- La autenticación se realiza mediante JWT en el encabezado de Autorización.
- Las fechas se envían y reciben en formato ISO 8601 (YYYY-MM-DD).
- Las horas se envían y reciben en formato de 24 horas (HH:MM:SS).

## Estructura de Respuestas

### Respuesta Exitosa

```json
{
  "status": "success",
  "payload": {
    // Datos solicitados
  }
}
```

### Respuesta de Error

```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Descripción del error"
  }
}
```

## Autenticación

### Registro de Usuario

**Endpoint:** `POST /api/sessions/register`

**Descripción:** Registra un nuevo usuario en el sistema.

**Cuerpo de la solicitud:**

```json
{
  "name": "Nombre Completo",
  "email": "usuario@ejemplo.com",
  "password": "contraseña"
}
```

**Respuesta exitosa (201 Created):**

```json
{
  "status": "success",
  "payload": {
    "user": {
      "id": "1234",
      "name": "Nombre Completo",
      "email": "usuario@ejemplo.com",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

### Inicio de Sesión

**Endpoint:** `POST /api/sessions/login`

**Descripción:** Autentica a un usuario existente.

**Cuerpo de la solicitud:**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña"
}
```

**Respuesta exitosa (200 OK):**

```json
{
  "status": "success",
  "payload": {
    "user": {
      "id": "1234",
      "name": "Nombre Completo",
      "email": "usuario@ejemplo.com",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

### Cierre de Sesión

**Endpoint:** `POST /api/sessions/logout`

**Descripción:** Cierra la sesión actual del usuario.

**Autenticación:** Requerida (Bearer Token)

**Respuesta exitosa (200 OK):**

```json
{
  "status": "success",
  "payload": {
    "message": "Sesión cerrada correctamente"
  }
}
```

### Usuario Actual

**Endpoint:** `GET /api/sessions/current`

**Descripción:** Obtiene información del usuario actualmente autenticado.

**Autenticación:** Requerida (Bearer Token)

**Respuesta exitosa (200 OK):**

```json
{
  "status": "success",
  "payload": {
    "user": {
      "id": "1234",
      "name": "Nombre Completo",
      "email": "usuario@ejemplo.com",
      "role": "user"
    }
  }
}
```

## Gestión de Turnos

### Obtener Turnos Disponibles

**Endpoint:** `GET /api/shifts?date=YYYY-MM-DD`

**Descripción:** Obtiene los turnos disponibles para una fecha específica.

**Autenticación:** Requerida (Bearer Token)

**Parámetros de consulta:**

- `date` (requerido): Fecha en formato YYYY-MM-DD

**Respuesta exitosa (200 OK):**

```json
{
  "status": "success",
  "payload": {
    "shifts": [
      {
        "id": "101",
        "date": "2023-08-10",
        "startTime": "09:00:00",
        "endTime": "10:00:00",
        "status": "available",
        "price": 50.00
      },
      {
        "id": "102",
        "date": "2023-08-10",
        "startTime": "10:30:00",
        "endTime": "11:30:00",
        "status": "available",
        "price": 50.00
      }
    ]
  }
}
```

## Gestión de Reservas

### Iniciar Reserva

**Endpoint:** `POST /api/bookings/initiate`

**Descripción:** Inicia el proceso de reserva para un turno específico.

**Autenticación:** Requerida (Bearer Token)

**Cuerpo de la solicitud:**

```json
{
  "shiftId": "101"
}
```

**Respuesta exitosa (200 OK):**

```json
{
  "status": "success",
  "payload": {
    "bookingToken": "jwt_booking_token_here"
  }
}
```

### Obtener Resumen de Reserva

**Endpoint:** `GET /api/bookings/summary`

**Descripción:** Obtiene detalles de una reserva iniciada usando el token de reserva.

**Autenticación:** Requerida (Bearer Token)

**Parámetros de consulta:**

- `bookingToken` (requerido): Token JWT de reserva obtenido al iniciar la reserva

**Respuesta exitosa (200 OK):**

```json
{
  "status": "success",
  "payload": {
    "shift": {
      "id": "101",
      "date": "2023-08-10",
      "startTime": "09:00:00",
      "endTime": "10:00:00",
      "price": 50.00
    },
    "expiresAt": "2023-08-01T14:30:00Z"
  }
}
```

## Gestión de Pagos

### Procesar Pago

**Endpoint:** `POST /api/payments/process`

**Descripción:** Procesa el pago para confirmar una reserva.

**Autenticación:** Requerida (Bearer Token)

**Cuerpo de la solicitud:**

```json
{
  "bookingToken": "jwt_booking_token_here",
  "paymentDetails": {
    "method": "credit_card",
    "cardNumber": "4111111111111111",
    "expiryMonth": "12",
    "expiryYear": "25",
    "cvv": "123"
  }
}
```

**Respuesta exitosa (200 OK):**

```json
{
  "status": "success",
  "payload": {
    "reservation": {
      "id": "201",
      "shiftId": "101",
      "status": "reserved",
      "date": "2023-08-10",
      "startTime": "09:00:00",
      "endTime": "10:00:00"
    },
    "payment": {
      "id": "301",
      "amount": 50.00,
      "method": "credit_card",
      "status": "completed",
      "transactionId": "tx_123456"
    }
  }
}
```

## Gestión de Citas

### Obtener Confirmación de Cita

**Endpoint:** `GET /api/bookings/confirmation/:reservationId`

**Descripción:** Obtiene detalles de confirmación de una reserva completada.

**Autenticación:** Requerida (Bearer Token)

**Parámetros de ruta:**

- `reservationId` (requerido): ID de la reserva

**Respuesta exitosa (200 OK):**

```json
{
  "status": "success",
  "payload": {
    "reservation": {
      "id": "201",
      "status": "reserved",
      "shift": {
        "date": "2023-08-10",
        "startTime": "09:00:00",
        "endTime": "10:00:00"
      },
      "payment": {
        "amount": 50.00,
        "method": "credit_card",
        "transactionId": "tx_123456"
      }
    }
  }
}
```

### Obtener Mis Citas

**Endpoint:** `GET /api/my-appointments`

**Descripción:** Obtiene todas las citas reservadas por el usuario autenticado.

**Autenticación:** Requerida (Bearer Token)

**Respuesta exitosa (200 OK):**

```json
{
  "status": "success",
  "payload": {
    "appointments": [
      {
        "id": "201",
        "status": "reserved",
        "shift": {
          "date": "2023-08-10",
          "startTime": "09:00:00",
          "endTime": "10:00:00"
        }
      },
      {
        "id": "202",
        "status": "completed",
        "shift": {
          "date": "2023-07-20",
          "startTime": "11:00:00",
          "endTime": "12:00:00"
        }
      }
    ]
  }
}
```

## Códigos de Error Comunes

- `AUTH_REQUIRED`: No se proporcionó token de autenticación
- `INVALID_TOKEN`: Token inválido o expirado
- `VALIDATION_ERROR`: Error de validación en los datos enviados
- `NOT_FOUND`: Recurso no encontrado
- `ALREADY_EXISTS`: El recurso ya existe (ej. correo electrónico ya registrado)
- `SHIFT_NOT_AVAILABLE`: El turno ya no está disponible
- `BOOKING_EXPIRED`: El token de reserva ha expirado
- `PAYMENT_FAILED`: Error en el procesamiento del pago

## Uso de Postman

Para probar la API, puede importar la colección de Postman incluida en el repositorio. La colección incluye ejemplos de todas las solicitudes documentadas aquí.

## Consideraciones de Seguridad

- Todas las solicitudes deben realizarse a través de HTTPS.
- Los tokens JWT tienen un tiempo de expiración limitado.
- Los tokens de reserva tienen un tiempo de expiración más corto (15 minutos).
- Las credenciales de pago nunca deben almacenarse en el sistema.
