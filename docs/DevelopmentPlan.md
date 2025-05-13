# 1. Estructura principal de carpetas

## 2. Flujo de navegación mejorado

El flujo de usuario sería:

1. Usuario selecciona fecha en `/shifts` (usando `ShiftCalendar.svelte`)
2. Se muestran turnos disponibles para esa fecha (usando `ShiftList.svelte`)
3. Usuario selecciona un turno y hace clic en "Reservar"
4. Usuario es llevado a `/shifts/booking` donde ve un resumen de la reserva
5. Usuario confirma y pasa a `/shifts/payment` donde selecciona método de pago
6. Una vez pagado, va a `/shifts/payment/confirmation`
7. El usuario puede ver sus citas en `/shifts/my-appointments`

## 3. Almacenamiento de estado

Para mejorar la experiencia de usuario, podemos implementar un almacenamiento de estado para el flujo de reserva:
quisiera que el almacenamiento sea sin estaso por medio de token quenerado por JWT con un tiempo de espiracion. Si el, agente porpone otra alternativa se evaluara

## 4. Servicios para interactuar con el backend

client/
  src/
    lib/
      services/
        shiftsService.js        # Servicio para gestionar turnos
        reservationService.js   # Servicio para gestionar reservas
        paymentService.js       # Servicio para gestionar pagos
        notificationService.js  # Servicio para enviar notificaciones

## Implementación del Flujo

### Flujo de Reserva y Pago

1. **Selección de turno**:
   - Usuario navega a `/shifts`
   - Selecciona fecha y turno disponible
   - Hace clic en "Continuar a Reserva"

2. **Confirmación de reserva**:
   - Usuario es dirigido a `/shifts/booking`
   - Ve detalles del turno y precio
   - Puede agregar notas o requerimientos especiales
   - Hace clic en "Proceder al pago"

3. **Pago**:
   - Usuario es dirigido a `/shifts/payment`
   - Selecciona método de pago
   - Completa los datos según el método elegido
   - Hace clic en "Pagar"

4. **Confirmación**:
   - Usuario es dirigido a `/shifts/payment/confirmation`
   - Ve confirmación del pago y detalles de la cita
   - Recibe email de confirmación (gestionado por el backend)
   - Puede volver al inicio o ver sus citas

### Manejo de Estados de Reserva

Para las reservas implementaríamos los siguientes estados:

- `pending_payment`: Turno reservado pero pendiente de pago
- `payment_processing`: Pago en procesamiento
- `reserved`: Turno confirmado y pagado
- `cancelled`: Turno cancelado
- `completed`: Turno ya utilizado

## Aspectos de Seguridad y UX

1. **Expiración de reservas pendientes de pago**:
   - Implementar un temporizador para que el usuario complete el pago
   - Si no se completa en X minutos, la reserva se libera

2. **Validación de formularios**:
   - Implementar validación en tiempo real para tarjetas de crédito
   - Mostrar errores de forma clara y accesible

3. **Recibos y comprobantes**:
   - Generar comprobantes PDF de pagos
   - Permitir descargar o enviar por email

4. **Historial de transacciones**:
   - Sección donde el usuario pueda ver todos sus pagos anteriores
   - Permitir solicitar reembolsos según políticas

## Integración del frontend con el Backend

Revisa la integracion entre @client y @server.

## 5. Guía de Desarrollo Full-Stack Paso a Paso

Esta guía describe el proceso de construcción incremental para el Sistema de Gestión de Turnos. Construiremos la aplicación funcionalidad por funcionalidad, abordando los requisitos tanto del backend como del frontend de manera coordinada, simulando un flujo de trabajo de desarrollo full-stack.

## Fase 1: Autenticación de Usuarios

**Objetivo:** Permitir a los usuarios registrarse e iniciar sesión en el sistema. Asegurar el acceso a las secciones autenticadas de la aplicación.

**Tareas Backend (`server/src/`):**

1. **Modelo de Base de Datos (`db/models/user.js`):**
    - Definir/verificar el modelo `User` de Sequelize.
    - Campos esenciales: `id` (PK), `name` (STRING), `email` (STRING, único, validado), `password` (STRING, hasheado), `role` (ENUM o STRING, ej: 'user', 'admin').
2. **Rutas API (`routes/sessionsRoutes.js` o similar):**
    - `POST /api/sessions/register`: Acepta nombre, email, contraseña.
    - `POST /api/sessions/login`: Acepta email, contraseña.
3. **Controladores (`controllers/sessions.Controller.js`):**
    - `register`:
        - Validar entrada (ej: usando Joi).
        - Verificar si el email ya existe.
        - Hashear contraseña (ej: usando `bcrypt`).
        - Crear y guardar nuevo usuario.
        - Devolver información del usuario (excluyendo contraseña) y un JWT.
    - `login`:
        - Validar entrada.
        - Encontrar usuario por email.
        - Comparar contraseña hasheada.
        - Si es válido, generar y devolver un JWT.
    - `logout`:
        - Limpiar la cookie de sesión que contiene el JWT (si se usa `cookie-parser`).
        - Devolver respuesta de cierre de sesión exitoso.
        - (Opcional: si se usa una lista negra de tokens, añadir el token actual a la lista).
    - `current`:
        - Extraer el usuario del objeto `req.user` (poblado por el middleware `protect` o la estrategia de Passport).
        - Devolver un DTO (Data Transfer Object) del usuario con la información necesaria (ej: email, rol, nombre), excluyendo datos sensibles como la contraseña.

4. **Middleware (`middleware/`):**
    - `passportCall.js`:
        - Contiene una función (ej: `passportCall(strategy, options)`) que devuelve un middleware.
        - Este middleware invoca `passport.authenticate(strategy, options, (err, user, info) => { ... })`.
        - Permite un manejo personalizado del resultado de la autenticación (errores, usuario encontrado o no).
        - Puede decidir si la autenticación es estrictamente requerida o es opcional (ej: para rutas que pueden ser accedidas por usuarios anónimos o autenticados).
        - Si la autenticación es exitosa, típicamente adjunta `user` a `req.user` y llama a `next()`.
        - Si falla y es requerida, puede devolver un error 401. Si es opcional y falla, puede simplemente llamar a `next()` sin `req.user`.
        - Ayuda a desacoplar la lógica de autenticación de las definiciones de ruta directamente.
    - `policies.js`:
        - Define funciones de middleware para la autorización basada en roles o permisos (ej: `isAdmin`, `isUser`, `isPremiumOrAdmin`).
        - Estas funciones se ejecutan después de que el usuario ha sido autenticado (es decir, `req.user` ya está poblado).
        - Verifican el rol o los permisos del `req.user`.
        - Si el usuario cumple con la política, llama a `next()`.
        - Si no cumple, devuelve un error de prohibido (403).
        - Se utilizan en las rutas para proteger endpoints específicos (ej: `this.put('/:id_user', ['USER'] ,passportCall('current'),usersController.updateUser)`).

5. **Utilidades JWT (`sessions.Controller.js` o dentro de `config/passport.config.js`):**
    - Función para generar JWT (ej: `generateToken(user)`):
        - Toma un objeto de usuario como entrada.
        - Crea un payload para el JWT (ej: `{ id: user.id, email: user.email, role: user.role }`).
        - Firma el token usando `jsonwebtoken.sign()` con el payload, `JWT_SECRET` y `JWT_EXPIRES_IN`.
        - Esta función puede ser un método estático o una función de utilidad importada/definida en `sessions.Controller.js` o centralizada en la configuración de Passport si la estrategia lo requiere.
        - Asegurar que `JWT_SECRET` y `JWT_EXPIRES_IN` estén configurados en un archivo `.env` y cargados correctamente.

6. **Passport.js (`/src/config/passport.config.js`):**
    - Instalar `passport` y `passport-jwt`.
    - Configurar la estrategia JWT (`JwtStrategy` de `passport-jwt`):
        - Especificar cómo extraer el JWT de la solicitud (ej: `ExtractJwt.fromAuthHeaderAsBearerToken()` o `ExtractJwt.fromExtractors([cookieExtractor])`).
        - Proveer `secretOrKey` con el valor de `JWT_SECRET`.
    - Implementar la función `verify` de la estrategia:
        - Recibe el payload del JWT decodificado.
        - Busca el usuario en la base de datos usando la información del payload (ej: `userId`).
        - Si el usuario se encuentra, llama a `done(null, user)`.
        - Si no se encuentra o hay un error, llama a `done(null, false)` o `done(error)`.
    - Inicializar Passport en la aplicación principal (`app.js`): `app.use(passport.initialize())`.
    - Crear una función `cookieExtractor` si se planea extraer el JWT de una cookie.

7. **BaseRouter (`route/BaseRouter.js`):**
    - Crear una clase `BaseRouter` que extienda `express.Router`.
    - Propósito: Centralizar lógica común para todas las rutas, como:
        - Manejo de respuestas estandarizadas (ej: `res.sendSuccess`, `res.sendError`).
        - Aplicación de políticas o middleware comunes a un conjunto de rutas (ej: `this.applyCallbacks(callbacks)`).
        - Gestión de errores de ruta.
    - Las rutas específicas (como `sessionsRoutes.js`) heredarían de `BaseRouter`.

8. **Configuración del Servidor (`app.js` o `server.js`):**
    - Importar e inicializar `passport` (`app.use(passport.initialize())`).
    - Integrar las rutas de autenticación (ej: `app.use('/api/sessions', sessionsRouter)`).
    - Usar middleware global como `cors`, `helmet`, `express.json`, `express.urlencoded({ extended: true })` y `cookie-parser` (si se usan cookies para JWT).

**Tareas Frontend (`client/src/`):**

1. **Servicios (`lib/services/authService.js`):**
    - `register(userData)`: HTTP POST a `/api/auth/register`.
    - `login(credentials)`: HTTP POST a `/api/auth/login`.
    - `logout()`: Limpia el token y el estado del usuario.
2. **Stores (`lib/stores/authStore.js` - store de Svelte):**
    - Gestiona el objeto `user` (o null), `token` (o null), `isAuthenticated` (booleano).
    - Acciones: `setUserAndToken(userData, token)`, `clearAuth()`.
    - Persistir token en localStorage/sessionStorage y cargarlo al inicializar la aplicación.
3. **Rutas y Páginas (SvelteKit):**
    - `src/routes/register/+page.svelte`: Formulario de registro (nombre, email, contraseña). Llama a `authService.register`. En caso de éxito, guarda token, actualiza store, redirige (ej: a login o página de turnos).
    - `src/routes/login/+page.svelte`: Formulario de login (email, contraseña). Llama a `authService.login`. En caso de éxito, guarda token, actualiza store, redirige (ej: a página de turnos).
    - `src/routes/(auth)/+layout.svelte`: Un layout para rutas autenticadas. Verifica `authStore`. Si no está autenticado, redirige a `/login`.
4. **Componentes Comunes (`lib/components/common/`):**
    - Considerar `Navbar.svelte` que muestra condicionalmente enlaces de Login/Registro o Logout/Mis Citas basado en `authStore`.

**Pruebas y Flujo de Trabajo:**

1. Nuevo usuario se registra exitosamente -> JWT recibido, guardado en localStorage, `authStore` actualizado.
2. Usuario registrado inicia sesión exitosamente -> JWT recibido, guardado, `authStore` actualizado.
3. Usuario intenta acceder a una ruta `(auth)` (ej: `/shifts`) sin haber iniciado sesión -> redirigido a `/login`.
4. Usuario con sesión iniciada accede a una ruta `(auth)` -> acceso concedido.
5. Usuario cierra sesión -> token limpiado, `authStore` actualizado, redirigido a una página pública (ej: inicio o login).

## Fase 2: Visualización de Turnos Disponibles

**Objetivo:** Permitir a los usuarios autenticados ver los turnos disponibles para reservar, seleccionables por fecha.

**Tareas Backend (`server/src/`):**

1. **Modelo de Base de Datos (`db/models/shift.js`):**
    - Definir/verificar el modelo `Shift` de Sequelize.
    - Campos esenciales: `id` (PK), `date` (DATEONLY), `startTime` (TIME), `endTime` (TIME), `status` (ENUM: 'available', 'booked', 'pending_payment', 'cancelled', 'completed'), `price` (DECIMAL).
    - (Opcional) `professionalId` si se soportan múltiples profesionales. Por ahora, asumir un único profesional.
    - Sembrar datos iniciales de turnos para desarrollo.
2. **Rutas API (`routes/shiftRoutes.js` o similar):**
    - `GET /api/shifts?date=YYYY-MM-DD`: Devuelve los turnos disponibles para la fecha dada. Esta ruta debe estar protegida por `authMiddleware.protect`.
3. **Controladores (`controllers/shiftController.js`):**
    - `getAvailableShifts`:
        - Validar formato de fecha.
        - Consultar tabla `Shifts` por turnos con `date` = fecha provista Y `status` = 'available'.
        - Devolver lista de turnos.

**Tareas Frontend (`client/src/`):**

1. **Servicios (`lib/services/shiftsService.js` - según `Tasks.md` existente):**
    - `getAvailableShifts(dateString)`: HTTP GET a `/api/shifts?date={dateString}`. Requiere token de autenticación en encabezados.
2. **Componentes (`lib/components/shifts/` - según `Tasks.md` existente):**
    - `ShiftCalendar.svelte`:
        - Usa Flatpickr o un selector de fechas similar.
        - Al seleccionar fecha, emite un evento o llama a una función para obtener turnos para esa fecha.
    - `ShiftList.svelte`:
        - Recibe una lista de objetos de turno como prop.
        - Muestra los detalles de cada turno (hora, precio).
        - Cada ítem de turno debe tener un botón "Seleccionar" o "Reservar".
    - `StatusBadge.svelte`: (Podría usarse aquí si los turnos tuvieran estados más variados visibles para los usuarios, pero principalmente para 'available' aquí).
3. **Página (`src/routes/(auth)/shifts/+page.svelte` - según `Tasks.md` existente):**
    - Integra `ShiftCalendar` y `ShiftList`.
    - Gestiona el estado de la fecha seleccionada.
    - Al montar o cambiar la fecha, llama a `shiftsService.getAvailableShifts` y pasa los resultados a `ShiftList`.
    - Maneja estados de carga y mensajes de error.
    - El `+page.server.js` para esta ruta podría usarse para carga inicial de datos si se prefiere, o toda la lógica puede ser del lado del cliente después de la autenticación.

**Pruebas y Flujo de Trabajo:**

1. Usuario autenticado navega a `/shifts`.
2. Se muestra `ShiftCalendar`. Usuario selecciona una fecha.
3. Se realiza una solicitud a `/api/shifts?date=...` con el token de autenticación.
4. `ShiftList` se actualiza con los turnos disponibles para la fecha seleccionada.
5. Si no hay turnos disponibles, se muestra un mensaje apropiado.
6. Cada turno en la lista tiene un botón para proceder con la reserva.

## Fase 3: Reserva de un Turno - Iniciación y Resumen

**Objetivo:** Permitir a los usuarios seleccionar un turno y ver un resumen antes de proceder al pago. Implementar progresión de reserva sin estado usando un JWT para el estado intermedio.

**Tareas Backend (`server/src/`):**

1. **Rutas API (`routes/bookingRoutes.js` o similar):**
    - `POST /api/bookings/initiate`:
        - Protegido por `authMiddleware.protect`.
        - Acepta `shiftId`.
        - Valida que el turno siga disponible.
        - Genera un "JWT de reserva" (distinto del JWT de autenticación) que contiene `shiftId`, `userId`, `price`, `bookingExpiryTimestamp` (ej: 15 minutos desde ahora).
        - Devuelve este JWT de reserva.
    - `GET /api/bookings/summary`: (Opcional, si el frontend no puede decodificar JWT)
        - Protegido por `authMiddleware.protect`.
        - Acepta JWT de reserva.
        - Valida JWT de reserva, verifica caducidad, obtiene detalles del turno.
        - Devuelve detalles del turno para el resumen.
2. **Controladores (`controllers/bookingController.js`):**
    - `initiateBooking`:
        - Encontrar turno por `shiftId`. Verificar si `status` es 'available'.
        - Si no está disponible, devolver error.
        - Crear payload del JWT de reserva.
        - Firmar y devolver el JWT de reserva.
        - **Nota:** En esta etapa, el estado del turno NO se cambia en la BD para mantener la sensación "sin estado" usando solo el token. El riesgo es la doble reserva si dos usuarios inician para el mismo horario y uno procede más rápido. Un estado temporal de "en espera" en la BD actualizado mediante este token más tarde, o una verificación y asignación más robusta en el pago, sería más seguro pero se desvía del estricto "sin estado mediante token". Por ahora, seguimos la solicitud.
    - `getBookingSummaryFromToken`: (Si se implementa `GET /api/bookings/summary`)
        - Verificar y decodificar JWT de reserva.
        - Obtener detalles completos del turno usando `shiftId` del token.
        - Devolver detalles.

**Tareas Frontend (`client/src/`):**

1. **Servicios (`lib/services/reservationService.js` - según `Tasks.md` existente):**
    - `initiateBooking(shiftId)`: HTTP POST a `/api/bookings/initiate`. Devuelve JWT de reserva.
    - `getBookingSummary(bookingToken)`: (Si existe endpoint en backend) HTTP GET a `/api/bookings/summary` con token de reserva.
2. **Stores (`lib/stores/bookingStore.js` - store de Svelte, opcional):**
    - Para mantener temporalmente el `bookingToken` y quizás detalles decodificados de la reserva durante el flujo.
3. **Página (`src/routes/(auth)/shifts/booking/+page.svelte` - según `Tasks.md` existente):**
    - Esta página se carga después de iniciar una reserva. Podría recibir el `bookingToken` mediante parámetro de consulta o desde `bookingStore`.
    - Si `bookingToken` está presente:
        - Muestra `ReservationSummary.svelte`.
        - Decodifica JWT de reserva en el lado del cliente (si la librería lo permite y es seguro) o llama a `reservationService.getBookingSummary(bookingToken)` para obtener detalles.
        - El resumen debe mostrar detalles del turno, precio y el tiempo de caducidad del token de reserva.
        - Tiene un botón "Proceder al Pago".
4. **Componentes (`lib/components/reservations/ReservationSummary.svelte`):**
    - Muestra detalles del turno seleccionado para confirmación.
    - Muestra el tiempo restante basado en la caducidad del JWT de reserva.

**Flujo de Trabajo y Gestión de Estado JWT:**

1. Usuario en `/shifts` hace clic en "Reservar" para un turno disponible.
2. Se llama a `reservationService.initiateBooking(shiftId)`.
3. El backend devuelve un `bookingToken`.
4. El frontend almacena `bookingToken` (ej: en `bookingStore` o lo pasa vía URL) y navega a `/shifts/booking`.
5. La página `/shifts/booking` recupera/decodifica `bookingToken`.
    - Muestra un temporizador de cuenta regresiva basado en la caducidad del token.
    - Si el token está caducado o es inválido, debe redirigir al usuario de vuelta a `/shifts` con un mensaje.
6. Usuario revisa el resumen y hace clic en "Proceder al Pago", pasando el `bookingToken`.

## Fase 4: Proceso de Pago

**Objetivo:** Permitir a los usuarios seleccionar un método de pago y "completar" un pago para su turno seleccionado, usando el `bookingToken`.

**Tareas Backend (`server/src/`):**

1. **Modelo de Base de Datos (`db/models/payment.js` y actualizar `db/models/shift.js`):**
    - Modelo `Payment`: `id`, `bookingId` (o `shiftId`), `amount`, `paymentMethod`, `status` ('pending', 'completed', 'failed'), `transactionId` (opcional).
    - Añadir `reservationId` o `paymentId` al modelo `Shift` o crear un modelo `Reservation` que vincule Usuario, Turno y Pago. Por simplicidad, asumamos que un modelo `Reservation` es mejor:
    - Modelo `Reservation`: `id`, `userId`, `shiftId`, `status` ('pending_payment', 'payment_processing', 'reserved', 'cancelled', 'completed'), `bookingTokenUsed` (string, para asegurar uso único).
2. **Rutas API (`routes/paymentRoutes.js` o similar):**
    - `POST /api/payments/process`:
        - Protegido por `authMiddleware.protect`.
        - Acepta `bookingToken` y `paymentDetails` (ej: método, información de tarjeta ficticia).
3. **Controladores (`controllers/paymentController.js`):**
    - `processPayment`:
        - Verificar y decodificar `bookingToken`. Comprobar caducidad.
        - Extraer `shiftId`, `userId`, `price` del token.
        - **Paso Crítico:**
            - Comprobar si ya existe una `Reservation` para este `bookingTokenUsed` (para prevenir reintentos).
            - Comprobar atómicamente si el `Shift` con `shiftId` *aún* está 'available'. Si no, el pago falla.
            - Si está disponible, crear un registro `Reservation` con estado `pending_payment` o `payment_processing`.
            - Actualizar estado de `Shift` a `booked` (o `pending_payment`).
            - (Simular procesamiento de pago)
            - Si el pago "tiene éxito":
                - Actualizar estado de `Reservation` a `reserved`.
                - Crear un registro `Payment` con estado `completed`.
                - Devolver respuesta de éxito con detalles de la reserva.
            - Si el pago "falla":
                - Actualizar estado de `Reservation` a `payment_failed` (o revertir estado de `Shift` a 'available' si no se guardó registro de reserva).
                - Devolver error.
4. **Servicios (`services/paymentProcessorService.js` - Placeholder):**
    - Un servicio simulado para simular interacciones con diferentes métodos de pago. Por ahora, puede simplemente devolver éxito/fracaso aleatoriamente o basado en datos ficticios.

**Tareas Frontend (`client/src/`):**

1. **Servicios (`lib/services/paymentService.js` - según `Tasks.md` existente):**
    - `processPayment(bookingToken, paymentDetails)`: HTTP POST a `/api/payments/process`.
2. **Página (`src/routes/(auth)/shifts/payment/+page.svelte` - según `Tasks.md` existente):**
    - Recibe `bookingToken` (desde URL o store). Si es inválido/caducado, redirigir.
    - Muestra `PaymentForm.svelte`.
    - Al enviar, llama a `paymentService.processPayment`.
    - En caso de éxito, navega a `/shifts/payment/confirmation`.
    - En caso de fallo, muestra mensaje de error.
3. **Componentes (`lib/components/payment/` - según `Tasks.md` existente):**
    - `PaymentForm.svelte` (actúa como contenedor).
    - `PaymentMethodSelector.svelte`: Permite elegir métodos de pago (simulados).
    - `CreditCardForm.svelte`, `BankTransferForm.svelte` (formularios simplificados por ahora).
    - Estos formularios recolectan datos ficticios.

**Pruebas y Flujo de Trabajo:**

1. Usuario está en `/shifts/booking`, hace clic en "Proceder al Pago". Se pasa `bookingToken`.
2. Usuario llega a `/shifts/payment`, selecciona un método, llena detalles ficticios.
3. Hace clic en "Pagar". Se llama a `paymentService.processPayment` con `bookingToken` y detalles de pago.
4. Procesos del Backend:
    - Valida `bookingToken`.
    - Comprueba disponibilidad del turno nuevamente (crítico para concurrencia).
    - Crea registros `Reservation` y `Payment`. Actualiza estado de `Shift`.
5. Si tiene éxito, el frontend redirige a la página de confirmación.
6. Si `bookingToken` caducó o el turno dejó de estar disponible antes del pago, el pago falla, el usuario ve un error.

## Fase 5: Confirmación de Pago

**Objetivo:** Mostrar confirmación de una reserva y pago exitosos.

**Tareas Backend (`server/src/`):**

1. **Rutas API (`routes/bookingRoutes.js` o `paymentRoutes.js`):**
    - `GET /api/bookings/confirmation/:reservationId`: (Opcional, si la página de confirmación necesita obtener datos frescos)
        - Protegido por `authMiddleware.protect`.
        - Acepta `reservationId`.
        - Obtiene detalles de la reserva confirmada (Reserva, Turno, Usuario).
2. **Controladores (`controllers/bookingController.js` o `paymentController.js`):**
    - `getBookingConfirmationDetails`:
        - Encontrar `Reservation` por `reservationId`. Asegurar que pertenece al usuario autenticado.
        - Poblar con detalles del `Shift` relacionado.
        - Devolver detalles.

**Tareas Frontend (`client/src/`):**

1. **Página (`src/routes/(auth)/shifts/payment/confirmation/+page.svelte` - según `Tasks.md` existente):**
    - Típicamente recibe `reservationId` vía parámetro URL después de un pago exitoso.
    - El `+page.server.js` para esta ruta podría obtener detalles de la reserva usando `reservationId` y token de `auth`, pasándolos a la página.
    - O, `+page.svelte` obtiene detalles del lado del cliente usando `reservationService.getReservationDetails(reservationId)`.
    - Muestra `PaymentConfirmation.svelte`.
2. **Componentes (`lib/components/payment/PaymentConfirmation.svelte` - según `Tasks.md` existente):**
    - Muestra un mensaje de éxito, resumen del turno reservado (fecha, hora) e ID de reserva.
    - Enlaces a "Mis Citas" o "Inicio".
3. **Servicios (`lib/services/reservationService.js`):**
    - `getReservationDetails(reservationId)`: (Si se obtiene del lado del cliente) HTTP GET a `/api/bookings/confirmation/{reservationId}`.

**Pruebas y Flujo de Trabajo:**

1. Después de un pago exitoso en `/shifts/payment`, el usuario es redirigido a `/shifts/payment/confirmation/{reservationId}`.
2. La página obtiene y muestra detalles de la reserva confirmada.
3. El usuario ve un mensaje de éxito y detalles de la cita.

## Fase 6: Visualización de "Mis Citas"

**Objetivo:** Permitir a los usuarios con sesión iniciada ver una lista de sus citas reservadas pasadas y futuras.

**Tareas Backend (`server/src/`):**

1. **Rutas API (`routes/bookingRoutes.js` o `appointmentRoutes.js`):**
    - `GET /api/my-appointments`:
        - Protegido por `authMiddleware.protect`.
        - Obtiene todas las reservas para el usuario autenticado.
2. **Controladores (`controllers/bookingController.js` o `appointmentController.js`):**
    - `getMyAppointment` (o `getMisCitas`):
        - Obtener `userId` de `req.user` (establecido por `authMiddleware`).
        - Encontrar todos los registros `Reservation` donde `userId` coincida y el estado sea 'reserved' o 'completed'.
        - Poblar con detalles del `Shift` relacionado para cada reserva.
        - Devolver lista de citas.

**Tareas Frontend (`client/src/`):**

1. **Servicios (`lib/services/reservationService.js`):**
    - `getMyAppointments()`: HTTP GET a `/api/my-appointments`.
2. **Página (`src/routes/(auth)/shifts/my-appointments/+page.svelte` - según `Tasks.md` existente):**
    - Obtiene citas usando `reservationService.getMyAppointments()` ya sea en `+page.server.js` o del lado del cliente en `+page.svelte`.
    - Muestra citas usando `ReservationHistory.svelte` o un componente similar.
3. **Componentes (`lib/components/reservations/ReservationHistory.svelte` - según `Tasks.md` existente):**
    - Recibe una lista de objetos de cita.
    - Muestra los detalles de cada cita (fecha, hora, servicio, estado).
    - Podría permitir ordenar o filtrar (ej: próximas vs. pasadas).

**Pruebas y Flujo de Trabajo:**

1. Usuario con sesión iniciada navega a `/shifts/my-appointments`.
2. Se realiza una solicitud a `/api/my-appointments`.
3. La página muestra una lista de las citas confirmadas del usuario.
4. Si no hay citas, se muestra un mensaje apropiado.

## Consideraciones Generales Durante el Desarrollo

- **Manejo de Errores:** Implementar manejo de errores robusto tanto en backend (respuestas de error consistentes) como en frontend (mostrando mensajes amigables para el usuario).
- **Validación:** Usar Joi o similar para validación de entradas en backend. Implementar validación del lado del cliente para mejor UX.
- **Seguridad:**
  - Revisar regularmente prácticas de seguridad (OWASP Top 10).
  - Asegurar uso adecuado de JWTs, hasheo de contraseñas.
  - Sanitizar entradas para prevenir XSS.
  - Proteger contra CSRF si se usa autenticación basada en sesión (menos relevante para JWT en encabezado de Autorización).
- **Gestión de Estado (Frontend):** Usar stores de Svelte eficazmente para estado compartido (autenticación, flujo de reserva).
- **Estilos:** Usar Tailwind CSS y DaisyUI según lo planeado.
- **Variables de Entorno:** Usar archivos `.env` para configuración (credenciales de BD, secretos de JWT, URLs de API).
- **Linting/Formateo:** Usar ESLint y Prettier para mantener la calidad del código.
- **Modularidad:** Mantener componentes y servicios enfocados y reutilizables.
- **Capa de Servicio Backend:** Considerar añadir una capa de servicio en el backend entre controladores y modelos para lógica de negocio más compleja si es necesario.

Esta guía paso a paso debería proporcionar un camino claro para que construyamos la aplicación juntos. Podemos abordar cada fase, y dentro de cada fase, cada tarea, una por una.
