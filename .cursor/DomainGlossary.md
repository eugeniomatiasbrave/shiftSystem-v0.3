# Glosario de Términos del Dominio - Shift Management System

Este glosario define la terminología específica utilizada en el Sistema de Gestión de Turnos. Establecer un lenguaje común ayuda a evitar confusiones y garantiza que todos los miembros del equipo y las partes interesadas utilicen la misma terminología.

## Términos Generales

### Turno (Shift)

Un espacio de tiempo disponible para que un profesional de la salud ofrezca sus servicios. Un turno tiene una fecha, hora de inicio, hora de fin y un estado (disponible, reservado, cancelado, etc.).

### Cita (Appointment)

Un turno que ha sido reservado por un usuario y confirmado tras el pago. Representa un compromiso entre el profesional y el paciente.

### Reserva (Booking)

El proceso de seleccionar un turno y proceder al pago. Una reserva puede estar en diferentes estados (pendiente de pago, confirmada, cancelada).

### Usuario (User)

Cualquier persona registrada en el sistema. Puede tener diferentes roles.

### Paciente (Patient)

Un usuario que busca servicios de salud y puede reservar turnos.

### Profesional (Professional)

Un usuario con rol administrativo que ofrece servicios de salud y define sus turnos disponibles.

### Admin

Un usuario con privilegios para gestionar todo el sistema, incluyendo usuarios, turnos y pagos.

## Estados de Turnos y Reservas

### Disponible (Available)

Un turno que aún no ha sido reservado y está disponible para ser seleccionado por un paciente.

### Pendiente de Pago (Pending Payment)

Un turno que ha sido seleccionado por un usuario pero cuyo pago aún no se ha completado.

### Procesando Pago (Payment Processing)

Un turno cuyo pago está siendo procesado.

### Reservado (Reserved / Booked)

Un turno que ha sido confirmado tras el pago y está asignado a un paciente específico.

### Cancelado (Cancelled)

Un turno que había sido reservado pero que fue cancelado por el paciente o por el profesional.

### Completado (Completed)

Un turno que ya ha ocurrido y el servicio se ha prestado.

## Conceptos de Pago

### Pago (Payment)

Transacción monetaria que confirma la reserva de un turno.

### Método de Pago (Payment Method)

Forma en que se realiza el pago (tarjeta de crédito, transferencia bancaria, etc.).

### Comprobante de Pago (Payment Receipt)

Documento que certifica que se ha realizado un pago.

### Reembolso (Refund)

Devolución parcial o total del pago cuando una cita es cancelada según las políticas establecidas.

## Conceptos de Autenticación y Autorización

### Token de Autenticación (Authentication Token)

Un JWT que identifica a un usuario tras iniciar sesión exitosamente.

### Token de Reserva (Booking Token)

Un JWT temporal que contiene la información necesaria para completar una reserva durante el flujo de pago.

### Rol (Role)

Define los permisos y capacidades de un usuario en el sistema (admin, profesional, paciente).

### Sesión (Session)

Período durante el cual un usuario está autenticado en el sistema.

## Conceptos de Interfaz de Usuario

### Calendario de Turnos (Shift Calendar)

Componente visual que muestra los turnos disponibles organizados por fecha.

### Lista de Turnos (Shift List)

Componente que muestra los turnos disponibles para una fecha seleccionada.

### Resumen de Reserva (Booking Summary)

Vista que muestra los detalles de un turno seleccionado antes de proceder al pago.

### Historial de Citas (Appointment History)

Vista que muestra las citas pasadas y futuras de un usuario.

## Conceptos Técnicos

### DTO (Data Transfer Object)

Objeto utilizado para transportar datos entre subsistemas de la aplicación, típicamente entre el backend y el frontend.

### API RESTful

Interfaz que permite la comunicación entre el frontend y el backend siguiendo principios REST.

### JWT (JSON Web Token)

Token utilizado para autenticación y autorización, así como para mantener estado entre pasos del flujo de reserva.
