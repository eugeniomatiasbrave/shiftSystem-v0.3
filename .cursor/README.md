# ShiftSystem v0.3 - Documentación de Desarrollo

## Acerca del Proyecto

ShiftSystem es una plataforma digital diseñada para la gestión eficiente de turnos y citas en el ámbito de la salud. La aplicación permite a profesionales de la salud (psicólogos, terapeutas, médicos) ofrecer sus servicios de consulta mediante un sistema de citas disponibles en la web.

## Documentación Disponible

### Documentos Principales

- **ApplicationContext.md**: Contexto general de la aplicación, modelo de negocio y stack tecnológico.
- **DevelopmentPlan.md**: Plan detallado paso a paso para el desarrollo de la aplicación.
- **DevelopmentTaskTable.md**: Tabla de seguimiento para controlar el progreso de las tareas.
- **APIDocumentation.md**: Documentación de la API para integración con el backend.
- **CodeStandards.md**: Estándares de código a seguir durante el desarrollo.
- **DomainGlossary.md**: Glosario de términos específicos del dominio.
- **TroubleshootingGuide.md**: Guía para la resolución de problemas comunes.

## Cómo Usar la Tabla de Seguimiento

La tabla de seguimiento (`DevelopmentTaskTable.md`) está diseñada para facilitar la gestión del desarrollo del proyecto:

1. **Actualización de Estado**:
   - Actualiza el estado de las tareas cambiando `🔲 Pendiente` a `✅ Completado` a medida que avanzas.
   - Las tareas están organizadas por fases para mantener un desarrollo estructurado.

2. **Prioridades**:
   - `Alta`: Crítico para la funcionalidad básica
   - `Media`: Importante pero no bloquea el desarrollo
   - `Baja`: Mejoras que pueden añadirse después de la funcionalidad principal

3. **Puntos de Verificación**:
   - Al final de cada fase hay puntos de verificación que describen el flujo que debe probarse.
   - Asegúrate de completar estas pruebas antes de pasar a la siguiente fase.

4. **Dependencias**:
   - Cada tarea indica qué otras tareas deben completarse antes de iniciarla.
   - Respeta estas dependencias para evitar problemas durante el desarrollo.

5. **Tareas Complementarias**:
   - Las tareas marcadas con [+] son mejoras adicionales que pueden implementarse según sea necesario.

## Orden de Desarrollo Recomendado

Sigue el orden lógico sugerido al final de la tabla de seguimiento:

1. Comienza con la autenticación (Fase 1)
2. Configura las utilidades básicas (tareas C.1, C.3, C.5, C.6)
3. Implementa la visualización de turnos (Fase 2)
4. Continúa con las fases de reserva, pago y confirmación
5. Implementa las tareas complementarias según su prioridad

## Estructura del Proyecto

El proyecto sigue una arquitectura cliente-servidor:

- **Frontend (@client)**: Implementado con SvelteKit, Tailwind CSS y DaisyUI.
- **Backend (@server)**: Implementado con Node.js, Express.js, Sequelize y MySQL.

## Recomendaciones para el Desarrollo

1. **Revisa el Contexto**: Antes de empezar, familiarízate con el contexto del proyecto en `ApplicationContext.md`.
2. **Sigue el Plan**: El archivo `DevelopmentPlan.md` contiene instrucciones detalladas para cada fase.
3. **Mantén el Seguimiento**: Actualiza regularmente la tabla de seguimiento para visualizar el progreso.
4. **Respeta los Estándares**: Consulta `CodeStandards.md` para mantener consistencia en el código.
5. **Consulta el Glosario**: Usa `DomainGlossary.md` para entender la terminología específica del dominio.

## Contribución

Al contribuir al proyecto, asegúrate de:

1. Seguir los estándares de código establecidos
2. Actualizar la documentación relevante
3. Mantener actualizadas las tablas de seguimiento
4. Realizar pruebas en los puntos de verificación
5. Documentar cualquier cambio significativo en la arquitectura o el diseño
