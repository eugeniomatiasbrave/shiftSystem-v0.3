# Estándares de Código - Shift Management System

Este documento define los estándares de código y las convenciones a seguir durante el desarrollo del Shift Management System. Seguir estas convenciones nos ayuda a mantener un código coherente, legible y mantenible a lo largo del proyecto.

## Convenciones Generales

### Idioma de Código

- Todo el código, nombres de variables, funciones, clases y comentarios deben escribirse en **inglés**.
- La documentación para usuarios (como este documento) puede estar en español.

### Formato

- Usar 2 espacios para la indentación.
- Usar punto y coma (;) al final de cada declaración en JavaScript.
- Longitud máxima de línea: 100 caracteres.
- Usar comillas simples (') para strings en JavaScript.
- Usar comillas dobles (") para atributos en HTML/Svelte.

## Frontend (SvelteKit)

### Componentes Svelte

#### Nomenclatura

- Usar **PascalCase** para nombres de componentes: `ShiftCalendar.svelte`, `PaymentForm.svelte`.
- Usar **camelCase** para nombres de props, funciones y variables internas del componente.
- Prefijos recomendados:
  - `is` o `has` para booleanos: `isLoading`, `hasError`.
  - `on` para manejadores de eventos: `onClick`, `onSubmit`.

#### Estructura de Componentes

```svelte
<script>
  // 1. Imports
  import { onMount } from 'svelte';
  import OtherComponent from './OtherComponent.svelte';
  
  // 2. Props
  export let propName = defaultValue;
  
  // 3. Variables locales
  let localVar;
  
  // 4. Reactive declarations
  $: derivedValue = someCalculation(propName);
  
  // 5. Lifecycle hooks
  onMount(() => {
    // initialization code
  });
  
  // 6. Event handlers
  function handleEvent() {
    // event handling logic
  }
</script>

<!-- Markup con clases de Tailwind -->
<div class="container mx-auto">
  <h1 class="text-2xl">Title</h1>
</div>

<style>
  /* Estilos específicos del componente que no se puedan lograr con Tailwind */
</style>
```

### Stores de Svelte

- Usar **camelCase** para nombres de stores: `authStore`, `bookingStore`.
- Colocar los stores en `src/lib/stores/`.
- Exportar la instancia del store, no los valores individuales.

### Servicios

- Usar **camelCase** para nombres de servicios y funciones: `shiftsService.js`.

- Cada servicio debe enfocarse en un dominio específico: `authService`, `paymentService`.
- Usar async/await para operaciones asíncronas.
- Manejar errores de forma consistente.

## Backend (Express.js)

### Estructura de API

- Usar rutas RESTful.
- Usar sustantivos en plural para recursos: `/api/shifts`, `/api/bookings`.
- Versionar la API si es necesario: `/api/v1/shifts`.

### Controladores

- Usar **camelCase** para nombres de controladores y funciones: `shiftController.js`.
- Seguir la estructura:
  1. Validación de entradas
  2. Lógica de negocio
  3. Manejo de respuestas/errores
- Usar DTOs (Data Transfer Objects) para transformar datos antes de enviarlos al cliente.

### Middleware

- Usar **camelCase** para nombres de middleware: `authMiddleware.js`.
- Cada middleware debe tener una responsabilidad única.
- Documentar los parámetros y el propósito de cada middleware.

### Modelos (Sequelize)

- Usar **PascalCase** para nombres de modelos: `User`, `Shift`.
- Usar **snake_case** para nombres de tablas en la base de datos: `users`, `shifts`.
- Definir relaciones claramente en los modelos.
- Usar validaciones a nivel de modelo.

## Patrones a seguir

### Manejo de Errores

- Usar try/catch para código asíncrono.
- Crear clases/tipos de error personalizados para distintos casos de uso.
- Centralizar el manejo de errores en el backend.
- Proporcionar mensajes de error claros y útiles.

### Testing

- Nombrar archivos de test con el patrón `[nombre].test.js` o `[nombre].spec.js`.
- Usar descripciones claras para bloques `describe` e `it`.
- Seguir el patrón AAA (Arrange-Act-Assert).

### Commit Messages

- Usar el formato: `tipo(ámbito): descripción concisa`.
- Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
- Ámbito: componente o área que se modifica.
- Descripción: en tiempo presente, comenzar con verbo.

## Herramientas y Configuración

### Linting y Formateo

- ESLint para linting de JavaScript.
- Prettier para formateo de código.
- Configuración unificada para todo el equipo.

### Pre-commit Hooks

- Lint y formateo automático antes de cada commit.
- Ejecución de tests unitarios antes de cada push.

Este documento es un punto de partida y puede evolucionar a medida que avanza el proyecto. Cualquier cambio propuesto debe ser discutido con el equipo para mantener la consistencia.
