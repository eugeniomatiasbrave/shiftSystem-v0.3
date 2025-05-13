# Guía de Implementación - ShiftSystem v0.3

Esta guía complementa el plan de desarrollo con instrucciones prácticas para implementar cada fase del proyecto.

## Consideraciones Generales

- **Control de Versiones**: Haz commits frecuentes con mensajes descriptivos. Recomendado seguir el patrón [Conventional Commits](https://www.conventionalcommits.org/).
- **Rama de Trabajo**: Trabaja en una rama de desarrollo y solo fusiona con main cuando una fase completa esté terminada y probada.
- **Pruebas**: Realiza pruebas manuales siguiendo los puntos de verificación al final de cada fase.

## Instrucciones por Fase

## Fase 1: Autenticación de Usuarios

1. **Modelo de Usuario**: ✅ Completado
2. **Implementación JWT**: ✅ Completado
3. **Store de Autenticación (Frontend)**:

## Fase 2: Visualización de Turnos

1. **Endpoint de Turnos Disponibles**:
2. **Servicio Frontend para Turnos**:

## Fase 3: Reserva y Resumen

1. **JWT de Reserva**:
2. **Componente de Temporizador**:

### Fase 4: Proceso de Pago

1. **Manejo de Pagos Concurrentes**:
  
### Fase 5: Confirmación de Pago

1. **Página de Confirmación**:

### Fase 6: Visualización de "Mis Citas"

1. **Filtrado en Frontend**:

## Despliegue y Consideraciones de Producción

1. **Variables de Entorno**:
2. **Seguridad**:
3. **Manejo de Errores**:
  
### Fase 1: Autenticación de Usuarios-

1. **Modelo de Usuario**:

   ```js
   // Ejemplo de implementación del modelo User
   module.exports = (sequelize, DataTypes) => {
     const User = sequelize.define('User', {
       name: {
         type: DataTypes.STRING,
         allowNull: false
       },
       email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
           isEmail: true
         }
       },
       password: {
         type: DataTypes.STRING,
         allowNull: false
       },
       role: {
         type: DataTypes.ENUM('user', 'admin'),
         defaultValue: 'user'
       }
     });
     return User;
   };
   ```

2. **Implementación JWT**:
   - Asegúrate de definir `JWT_SECRET` y `JWT_EXPIRES_IN` en el archivo `.env`
   - Ejemplo de generación de token:

   ```js
   const generateToken = (user) => {
     return jwt.sign(
       { id: user.id, email: user.email, role: user.role },
       process.env.JWT_SECRET,
       { expiresIn: process.env.JWT_EXPIRES_IN }
     );
   };
   ```

3. **Store de Autenticación (Frontend)**:

   ```js

   // client/src/lib/stores/authStore.js
   import { writable } from 'svelte/store';
   
   // Intenta cargar los datos guardados al inicializar
   const storedUser = localStorage.getItem('user');
   const storedToken = localStorage.getItem('token');
   
   const createAuthStore = () => {
     const { subscribe, set, update } = writable({
       user: storedUser ? JSON.parse(storedUser) : null,
       token: storedToken || null,
       isAuthenticated: !!storedToken
     });
     
     return {
       subscribe,
       setUserAndToken: (userData, token) => {
         localStorage.setItem('user', JSON.stringify(userData));
         localStorage.setItem('token', token);
         set({ user: userData, token, isAuthenticated: true });
       },
       clearAuth: () => {
         localStorage.removeItem('user');
         localStorage.removeItem('token');
         set({ user: null, token: null, isAuthenticated: false });
       }
     };
   };
   
   export const authStore = createAuthStore();
   ```

### Fase 2: Visualización de Turnos-

1. **Endpoint de Turnos Disponibles**:

   ```js
   // Ejemplo de controlador para obtener turnos disponibles
   const getAvailableShifts = async (req, res) => {
     try {
       const { date } = req.query;
       
       if (!date || !isValidDate(date)) {
         return res.status(400).json({ 
           status: 'error', 
           message: 'Fecha inválida o no proporcionada' 
         });
       }
       
       const shifts = await Shift.findAll({
         where: {
           date: date,
           status: 'available'
         },
         order: [['startTime', 'ASC']]
       });
       
       return res.status(200).json({
         status: 'success',
         data: shifts
       });
     } catch (error) {
       console.error(error);
       return res.status(500).json({
         status: 'error',
         message: 'Error al obtener los turnos disponibles'
       });
     }
   };
   ```

2. **Servicio Frontend para Turnos**:

   ```js
   // client/src/lib/services/shiftsService.js
   import axios from 'axios';
   import { authStore } from '../stores/authStore';
   
   // Configura axios con el token de autenticación
   let token;
   authStore.subscribe(state => {
     token = state.token;
   });
   
   const API_URL = import.meta.env.VITE_API_URL;
   
   export const getAvailableShifts = async (dateString) => {
     try {
       const response = await axios.get(`${API_URL}/shifts`, {
         params: { date: dateString },
         headers: {
           Authorization: `Bearer ${token}`
         }
       });
       return response.data;
     } catch (error) {
       console.error('Error obteniendo turnos:', error);
       throw error;
     }
   };
   ```

### Fase 3: Reserva y Resumen-

1. **JWT de Reserva**:
   Este token es separado del JWT de autenticación y tiene un período de expiración más corto.

   ```js
   const generateBookingToken = (shiftId, userId, price) => {
     return jwt.sign(
       {
         shiftId,
         userId,
         price,
         bookingExpiryTimestamp: Date.now() + 15 * 60 * 1000 // 15 minutos
       },
       process.env.BOOKING_JWT_SECRET,
       { expiresIn: '15m' }
     );
   };
   ```

2. **Componente de Temporizador**:

   ```svelte
   <!-- client/src/lib/components/common/ExpiryTimer.svelte -->
   <script>
     export let expiryTimestamp;
     let timeRemaining = '';
     let interval;
     
     function updateTimer() {
       const now = Date.now();
       const diff = expiryTimestamp - now;
       
       if (diff <= 0) {
         clearInterval(interval);
         timeRemaining = 'Expirado';
         dispatch('expired');
         return;
       }
       
       const minutes = Math.floor(diff / 60000);
       const seconds = Math.floor((diff % 60000) / 1000);
       timeRemaining = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
     }
     
     import { onMount, onDestroy, createEventDispatcher } from 'svelte';
     const dispatch = createEventDispatcher();
     
     onMount(() => {
       updateTimer();
       interval = setInterval(updateTimer, 1000);
     });
     
     onDestroy(() => {
       if (interval) clearInterval(interval);
     });
   </script>

   <div class="timer">
     <span class="timer-label">Expira en:</span>
     <span class="timer-value {timeRemaining === 'Expirado' ? 'expired' : ''}">{timeRemaining}</span>
   </div>

   <style>
     .timer {
       display: flex;
       align-items: center;
       gap: 0.5rem;
     }
     .timer-value {
       font-weight: bold;
     }
     .expired {
       color: red;
     }
   </style>
   ```

### Fase 4: Proceso de Pago-

1. **Manejo de Pagos Concurrentes**:
   Es crítico implementar bloqueo adecuado para evitar doble reserva. Ejemplo en Sequelize:

   ```js
   // Dentro del controlador de pago
   const processPayment = async (req, res) => {
     // Iniciar transacción para asegurar atomicidad
     const t = await sequelize.transaction();
     
     try {
       // Decodificar y verificar token
       const bookingData = jwt.verify(req.body.bookingToken, process.env.BOOKING_JWT_SECRET);
       
       // Verificar si el token ya fue usado
       const existingReservation = await Reservation.findOne({
         where: { bookingTokenUsed: req.body.bookingToken }
       }, { transaction: t });
       
       if (existingReservation) {
         await t.rollback();
         return res.status(400).json({
           status: 'error',
           message: 'Esta reserva ya ha sido procesada'
         });
       }
       
       // Verificar si el turno sigue disponible
       const shift = await Shift.findOne({
         where: {
           id: bookingData.shiftId,
           status: 'available'
         }
       }, { transaction: t });
       
       if (!shift) {
         await t.rollback();
         return res.status(400).json({
           status: 'error',
           message: 'El turno ya no está disponible'
         });
       }
       
       // Crear reserva pendiente
       const reservation = await Reservation.create({
         userId: bookingData.userId,
         shiftId: bookingData.shiftId,
         status: 'pending_payment',
         bookingTokenUsed: req.body.bookingToken
       }, { transaction: t });
       
       // Actualizar estado del turno
       await shift.update({ status: 'pending_payment' }, { transaction: t });
       
       // Procesar pago
       // ... código de procesamiento de pago ...
       
       // Si el pago es exitoso
       await reservation.update({ status: 'reserved' }, { transaction: t });
       await shift.update({ status: 'booked' }, { transaction: t });
       
       // Crear registro de pago
       await Payment.create({
         reservationId: reservation.id,
         amount: bookingData.price,
         paymentMethod: req.body.paymentMethod,
         status: 'completed'
       }, { transaction: t });
       
       // Confirmar transacción
       await t.commit();
       
       return res.status(200).json({
         status: 'success',
         data: { reservationId: reservation.id }
       });
       
     } catch (error) {
       // Algo salió mal, revertir todos los cambios
       await t.rollback();
       console.error(error);
       return res.status(500).json({
         status: 'error',
         message: 'Error al procesar el pago'
       });
     }
   };
   ```

### Fase 5: Confirmación de Pago-

1. **Página de Confirmación**:

   ```svelte
   <!-- client/src/routes/(auth)/shifts/payment/confirmation/+page.svelte -->
   <script>
     import { page } from '$app/stores';
     import { onMount } from 'svelte';
     import PaymentConfirmation from '$lib/components/payment/PaymentConfirmation.svelte';
     import { reservationService } from '$lib/services/reservationService';
     
     let reservation = null;
     let loading = true;
     let error = null;
     
     onMount(async () => {
       try {
         // Obtener el ID de reserva de los parámetros de URL
         const reservationId = $page.params.reservationId;
         
         if (!reservationId) {
           error = 'No se encontró identificador de reserva';
           loading = false;
           return;
         }
         
         // Obtener detalles de la reserva
         const data = await reservationService.getReservationDetails(reservationId);
         reservation = data.data;
         loading = false;
       } catch (err) {
         error = 'Error al obtener los detalles de la confirmación';
         loading = false;
         console.error(err);
       }
     });
   </script>

   <div class="container mx-auto px-4 py-8">
     {#if loading}
       <div class="flex justify-center">
         <div class="loading loading-spinner loading-lg"></div>
       </div>
     {:else if error}
       <div class="alert alert-error">
         <span>{error}</span>
       </div>
     {:else if reservation}
       <PaymentConfirmation {reservation} />
     {/if}
   </div>
   ```

### Fase 6: Visualización de "Mis Citas"-

1. **Filtrado en Frontend**:

   ```svelte
   <!-- client/src/routes/(auth)/shifts/my-appointments/+page.svelte -->
   <script>
     import { onMount } from 'svelte';
     import ReservationHistory from '$lib/components/reservations/ReservationHistory.svelte';
     import { reservationService } from '$lib/services/reservationService';
     
     let appointments = [];
     let filteredAppointments = [];
     let loading = true;
     let error = null;
     let filterType = 'all'; // 'all', 'upcoming', 'past'
     
     // Cargar citas
     onMount(async () => {
       try {
         const data = await reservationService.getMyAppointments();
         appointments = data.data;
         applyFilter(filterType);
         loading = false;
       } catch (err) {
         error = 'Error al cargar tus citas';
         loading = false;
         console.error(err);
       }
     });
     
     // Función para filtrar citas
     function applyFilter(type) {
       filterType = type;
       const now = new Date();
       
       if (type === 'all') {
         filteredAppointments = [...appointments];
       } else if (type === 'upcoming') {
         filteredAppointments = appointments.filter(app => new Date(app.shift.date) >= now);
       } else if (type === 'past') {
         filteredAppointments = appointments.filter(app => new Date(app.shift.date) < now);
       }
     }
   </script>

   <div class="container mx-auto px-4 py-8">
     <h1 class="text-2xl font-bold mb-6">Mis Citas</h1>
     
     <!-- Filtros -->
     <div class="tabs tabs-boxed mb-6">
       <button class="tab {filterType === 'all' ? 'tab-active' : ''}" 
               on:click={() => applyFilter('all')}>
         Todas
       </button>
       <button class="tab {filterType === 'upcoming' ? 'tab-active' : ''}" 
               on:click={() => applyFilter('upcoming')}>
         Próximas
       </button>
       <button class="tab {filterType === 'past' ? 'tab-active' : ''}" 
               on:click={() => applyFilter('past')}>
         Pasadas
       </button>
     </div>
     
     {#if loading}
       <div class="flex justify-center">
         <div class="loading loading-spinner loading-lg"></div>
       </div>
     {:else if error}
       <div class="alert alert-error">
         <span>{error}</span>
       </div>
     {:else if filteredAppointments.length === 0}
       <div class="alert">
         <span>No tienes citas {filterType === 'upcoming' ? 'próximas' : 
                                filterType === 'past' ? 'pasadas' : ''}</span>
       </div>
     {:else}
       <ReservationHistory appointments={filteredAppointments} />
     {/if}
   </div>
   ```

## Despliegue y Consideraciones de Producción-

1. **Variables de Entorno**:
   Asegúrate de configurar distintos archivos `.env` para desarrollo y producción:

   ```# .env.development
   NODE_ENV=development
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=shiftapi_dev
   JWT_SECRET=dev_jwt_secret_key
   JWT_EXPIRES_IN=1d
   BOOKING_JWT_SECRET=dev_booking_secret_key
   PORT=3000
   ```

   ```# .env.production
   NODE_ENV=production
   DB_HOST=your_production_host
   DB_USER=production_user
   DB_PASSWORD=strong_password
   DB_NAME=shiftapi_prod
   JWT_SECRET=production_jwt_secret_key
   JWT_EXPIRES_IN=1d
   BOOKING_JWT_SECRET=production_booking_secret_key
   PORT=3000
   ```

2. **Seguridad**:
   - Usa `helmet` para proteger headers HTTP
   - Implementa rate limiting para prevenir ataques de fuerza bruta
   - Valida todas las entradas de usuario en el backend
   - Nunca devuelvas contraseñas (incluso hasheadas) al frontend

3. **Manejo de Errores**:
   Implementa un sistema de registro de errores centralizado:

   ```js
   // server/src/utils/errorHandler.js
   const log4js = require('log4js');
   const logger = log4js.getLogger('error');
   
   // Configurar log4js según el entorno
   if (process.env.NODE_ENV === 'production') {
     log4js.configure({
       appenders: { 
         error: { type: 'file', filename: 'logs/error.log' },
         console: { type: 'console' }
       },
       categories: { 
         default: { appenders: ['error', 'console'], level: 'error' } 
       }
     });
   } else {
     log4js.configure({
       appenders: { console: { type: 'console' } },
       categories: { default: { appenders: ['console'], level: 'debug' } }
     });
   }
   
   const errorHandler = (err, req, res, next) => {
     logger.error(`${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
     
     // Verificar si es error conocido con código de estado personalizado
     const statusCode = err.statusCode || 500;
     
     res.status(statusCode).json({
       status: 'error',
       message: process.env.NODE_ENV === 'production' 
         ? 'Algo salió mal' 
         : err.message,
       stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
     });
   };
   
   module.exports = errorHandler;
   ```

Esta guía proporciona ejemplos prácticos para implementar las principales funcionalidades del sistema. Úsala como referencia junto con el plan de desarrollo y la tabla de seguimiento para completar el proyecto de manera estructurada.
