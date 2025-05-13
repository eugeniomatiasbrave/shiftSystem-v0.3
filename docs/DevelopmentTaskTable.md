# Tabla de Seguimiento de Desarrollo - ShiftSystem v0.3

## Instrucciones de Uso

- Use esta tabla para realizar seguimiento del progreso del desarrollo
- Marque las tareas completadas cambiando "🔲 Pendiente" a "✅ Completado"
- Las tareas complementarias están marcadas con [+]

## Fase 1: Autenticación de Usuarios

| ID | Descripción | Prioridad | Estado | Dependencias | Tiempo Estimado |
|----|-------------|-----------|--------|--------------|-----------------|
| 1.1 | Configurar modelo User en Sequelize | Alta | ✅ Completado | - | 2h |
| 1.2 | Crear rutas de autenticación (/api/sessions/*) | Alta | ✅ Completado | 1.1 | 2h |
| 1.3 | Implementar controlador de sesiones (register, login, logout) | Alta | ✅ Completado | 1.2 | 3h |
| 1.4 | Crear middleware de autenticación (passportCall.js) | Alta | ✅ Completado | 1.3 | 2h |
| 1.5 | Implementar middleware de políticas (policies.js) | Media | ✅ Completado | 1.4 | 2h |
| 1.6 | Configurar JWT y dotenv para secretos | Alta | ✅ Completado | - | 1h |
| 1.7 | Configurar estrategia Passport-JWT | Alta | ✅ Completado | 1.6 | 2h |
| 1.8 | Implementar BaseRouter con manejo de respuestas estándar | Media | 🔲 Pendiente | - | 2h |
| 1.9 | Crear servicio authService en frontend | Alta | 🔲 Pendiente | 1.3 | 2h |
| 1.10 | Implementar store de autenticación (authStore.js) | Alta | 🔲 Pendiente | 1.9 | 2h |
| 1.11 | Crear página de registro | Alta | ✅ Completado | 1.10 | 3h |
| 1.12 | Crear página de login | Alta | ✅ Completado | 1.10 | 3h |
| 1.13 | Implementar layout protegido (auth) | Alta | ✅ Completado | 1.10 | 2h |
| 1.14 | Crear navbar con estados condicionados por autenticación | Media | ✅ Completado | 1.10 | 2h |

**Punto de Verificación 1**: Probar flujo completo de registro, login, acceso a rutas protegidas y logout.

## Fase 2: Visualización de Turnos Disponibles

| ID | Descripción | Prioridad | Estado | Dependencias | Tiempo Estimado |
|----|-------------|-----------|--------|--------------|-----------------|
| 2.1 | Configurar modelo Shift en Sequelize | Alta | 🔲 Pendiente | - | 2h |
| 2.2 | Crear ruta para obtener turnos disponibles por fecha | Alta | 🔲 Pendiente | 2.1 | 1h |
| 2.3 | Implementar controlador para obtener turnos disponibles | Alta | 🔲 Pendiente | 2.2 | 2h |
| 2.4 | Crear servicio shiftsService en frontend | Alta | 🔲 Pendiente | 2.3 | 2h |
| 2.5 | Implementar componente ShiftCalendar | Alta | 🔲 Pendiente | - | 3h |
| 2.6 | Implementar componente ShiftList | Alta | 🔲 Pendiente | - | 3h |
| 2.7 | Implementar componente StatusBadge | Media | 🔲 Pendiente | - | 1h |
| 2.8 | Crear página de selección de turnos | Alta | 🔲 Pendiente | 2.4, 2.5, 2.6 | 3h |

**Punto de Verificación 2**: Usuario autenticado puede ver turnos disponibles por fecha y seleccionar uno.

## Fase 3: Reserva de Turno - Iniciación y Resumen

| ID | Descripción | Prioridad | Estado | Dependencias | Tiempo Estimado |
|----|-------------|-----------|--------|--------------|-----------------|
| 3.1 | Crear ruta para iniciar reserva | Alta | 🔲 Pendiente | 2.1 | 2h |
| 3.2 | Implementar controlador para iniciar reserva | Alta | 🔲 Pendiente | 3.1 | 3h |
| 3.3 | Implementar generación del JWT de reserva | Alta | 🔲 Pendiente | 3.2 | 2h |
| 3.4 | Crear servicio reservationService en frontend | Alta | 🔲 Pendiente | 3.3 | 2h |
| 3.5 | Implementar store bookingStore para estado temporal | Media | 🔲 Pendiente | 3.4 | 2h |
| 3.6 | Crear componente ReservationSummary | Alta | 🔲 Pendiente | - | 3h |
| 3.7 | Implementar página de resumen de reserva | Alta | 🔲 Pendiente | 3.4, 3.6 | 3h |
| 3.8 | [+] Implementar temporizador de expiración de reserva | Media | 🔲 Pendiente | 3.5 | 2h |

**Punto de Verificación 3**: Usuario puede seleccionar turno y ver resumen con temporizador de expiración.

## Fase 4: Proceso de Pago

| ID | Descripción | Prioridad | Estado | Dependencias | Tiempo Estimado |
|----|-------------|-----------|--------|--------------|-----------------|
| 4.1 | Configurar modelo Payment en Sequelize | Alta | 🔲 Pendiente | - | 2h |
| 4.2 | Configurar modelo Reservation en Sequelize | Alta | 🔲 Pendiente | 4.1 | 2h |
| 4.3 | Crear ruta para procesar pagos | Alta | 🔲 Pendiente | 4.1, 4.2 | 2h |
| 4.4 | Implementar controlador de procesamiento de pagos | Alta | 🔲 Pendiente | 4.3 | 4h |
| 4.5 | Crear servicio paymentService para frontend | Alta | 🔲 Pendiente | 4.4 | 2h |
| 4.6 | Implementar componente PaymentForm | Alta | 🔲 Pendiente | - | 3h |
| 4.7 | Implementar componente PaymentMethodSelector | Alta | 🔲 Pendiente | - | 2h |
| 4.8 | Crear formularios para diferentes métodos de pago | Media | 🔲 Pendiente | 4.7 | 4h |
| 4.9 | Implementar página de pago | Alta | 🔲 Pendiente | 4.5, 4.6 | 3h |
| 4.10 | [+] Implementar validación en tiempo real para datos de pago | Media | 🔲 Pendiente | 4.8 | 3h |

**Punto de Verificación 4**: Usuario puede completar el proceso de pago con diferentes métodos.

## Fase 5: Confirmación de Pago

| ID | Descripción | Prioridad | Estado | Dependencias | Tiempo Estimado |
|----|-------------|-----------|--------|--------------|-----------------|
| 5.1 | Crear ruta para obtener detalles de confirmación | Alta | 🔲 Pendiente | 4.2 | 2h |
| 5.2 | Implementar controlador de confirmación | Alta | 🔲 Pendiente | 5.1 | 2h |
| 5.3 | Actualizar servicio reservationService en frontend | Media | 🔲 Pendiente | 5.2 | 1h |
| 5.4 | Implementar componente PaymentConfirmation | Alta | 🔲 Pendiente | - | 2h |
| 5.5 | Crear página de confirmación de pago | Alta | 🔲 Pendiente | 5.3, 5.4 | 2h |
| 5.6 | [+] Implementar generación de comprobantes en PDF | Baja | 🔲 Pendiente | 5.5 | 4h |

**Punto de Verificación 5**: Usuario recibe confirmación clara y detallada después del pago.

## Fase 6: Visualización de "Mis Citas"

| ID | Descripción | Prioridad | Estado | Dependencias | Tiempo Estimado |
|----|-------------|-----------|--------|--------------|-----------------|
| 6.1 | Crear ruta para obtener citas del usuario | Alta | 🔲 Pendiente | 4.2 | 2h |
| 6.2 | Implementar controlador para listar citas | Alta | 🔲 Pendiente | 6.1 | 2h |
| 6.3 | Actualizar servicio reservationService en frontend | Media | 🔲 Pendiente | 6.2 | 1h |
| 6.4 | Implementar componente ReservationHistory | Alta | 🔲 Pendiente | - | 3h |
| 6.5 | Crear página de "Mis Citas" | Alta | 🔲 Pendiente | 6.3, 6.4 | 3h |
| 6.6 | [+] Implementar filtros y ordenamiento de citas | Media | 🔲 Pendiente | 6.5 | 2h |
| 6.7 | [+] Agregar funcionalidad de cancelación de citas | Media | 🔲 Pendiente | 6.5 | 3h |

**Punto de Verificación 6**: Usuario puede ver, filtrar y gestionar su historial de citas.

## Tareas Complementarias y Mejoras

| ID | Descripción | Prioridad | Estado | Dependencias | Tiempo Estimado |
|----|-------------|-----------|--------|--------------|-----------------|
| C.1 | Implementar manejo de errores robusto en backend | Alta | 🔲 Pendiente | - | 4h |
| C.2 | Implementar notificaciones amigables en frontend | Media | 🔲 Pendiente | - | 3h |
| C.3 | Configurar validación con Joi en backend | Alta | 🔲 Pendiente | - | 3h |
| C.4 | Implementar validación en frontend | Media | 🔲 Pendiente | - | 3h |
| C.5 | Establecer variables de entorno con dotenv | Alta | 🔲 Pendiente | - | 1h |
| C.6 | Configurar ESLint y Prettier | Media | 🔲 Pendiente | - | 2h |
| C.7 | Implementar pruebas unitarias básicas | Baja | 🔲 Pendiente | - | 5h |
| C.8 | Optimizar rendimiento de componentes | Baja | 🔲 Pendiente | - | 4h |
| C.9 | Implementar modo oscuro/claro | Baja | 🔲 Pendiente | - | 3h |
| C.10 | Mejorar accesibilidad (ARIA, contraste) | Media | 🔲 Pendiente | - | 3h |

## Orden Lógico de Implementación Recomendado

1. Fase 1: Autenticación (tareas 1.1 - 1.14)
2. Tareas C.1, C.3, C.5, C.6 (configuración básica)
3. Fase 2: Visualización de Turnos (tareas 2.1 - 2.8)
4. Fase 3: Reserva Inicial (tareas 3.1 - 3.8)
5. Fase 4: Proceso de Pago (tareas 4.1 - 4.10)
6. Fase 5: Confirmación (tareas 5.1 - 5.5)
7. Fase 6: Mis Citas (tareas 6.1 - 6.5)
8. Tareas opcionales por prioridad (restante de C y opcionales marcadas con [+])

**Nota**: Esta tabla será actualizada conforme avance el desarrollo. Las estimaciones de tiempo son aproximadas y pueden ajustarse según el progreso real.
