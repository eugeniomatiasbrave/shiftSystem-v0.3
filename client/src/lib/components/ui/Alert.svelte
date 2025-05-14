<!-- Alertas y notificaciones (SweetAlert2) -->
<script>
    import Swal from 'sweetalert2';

    /**
     * Muestra un mensaje de éxito
     * @param {string} title - Título del mensaje
     * @param {string} text - Texto del mensaje
     * @param {Function} callback - Función a ejecutar después de confirmar (opcional)
     */
    export function showSuccess(title = '¡Éxito!', text = 'Operación completada con éxito', callback = null) {
        Swal.fire({
            title,
            text,
            icon: 'success',
            confirmButtonColor: "#0a7399",
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed && callback) {
                callback();
            }
        });
    }

    /**
     * Muestra un mensaje de error
     * @param {string} title - Título del mensaje
     * @param {string} text - Texto del mensaje
     * @param {Function} callback - Función a ejecutar después de confirmar (opcional)
     */
    export function showError(title = 'Error', text = 'Ha ocurrido un error', callback = null) {
        Swal.fire({
            title,
            text,
            icon: 'error',
            confirmButtonColor: "#0a7399",
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed && callback) {
                callback();
            }
        });
    }

    /**
     * Muestra un mensaje de confirmación
     * @param {string} title - Título del mensaje
     * @param {string} text - Texto del mensaje
     * @param {Function} confirmCallback - Función a ejecutar después de confirmar
     * @param {Function} cancelCallback - Función a ejecutar después de cancelar (opcional)
     */
    export function showConfirm(
        title = '¿Estás seguro?',
        text = '¿Deseas continuar con esta acción?',
        confirmCallback,
        cancelCallback = null
    ) {
        Swal.fire({
            title,
            text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#542169',
            cancelButtonColor: '#f6d860',
            confirmButtonText: 'Sí, continuar',
            cancelButtonText: '<span style="color: black;">Cancelar</span>'
        }).then((result) => {
            if (result.isConfirmed && confirmCallback) {
                confirmCallback();
            } else if (result.dismiss === Swal.DismissReason.cancel && cancelCallback) {
                cancelCallback();
            }
        });
    }

    /**
     * Muestra un mensaje informativo
     * @param {string} title - Título del mensaje
     * @param {string} text - Texto del mensaje
     * @param {Function} callback - Función a ejecutar después de confirmar (opcional)
     */
    export function showInfo(title = 'Información', text = '', callback = null) {
        Swal.fire({
            title,
            text,
            icon: 'info',
            confirmButtonColor: "#0a7399",
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed && callback) {
                callback();
            }
        });
    }

    /**
     * Muestra un mensaje de alerta
     * @param {string} title - Título del mensaje
     * @param {string} text - Texto del mensaje
     * @param {Function} callback - Función a ejecutar después de confirmar (opcional)
     */
    export function showWarning(title = 'Advertencia', text = '', callback = null) {
        Swal.fire({
            title,
            text,
            icon: 'warning',
            confirmButtonColor: "#0a7399",
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed && callback) {
                callback();
            }
        });
    }

    /**
     * Muestra un toast (notificación pequeña)
     * @param {string} title - Título de la notificación
     * @param {string} icon - Icono (success, error, warning, info, question)
     * @param {number} timer - Tiempo en milisegundos que se mostrará
     */
    export function showToast(title = 'Notificación', icon = 'info', timer = 3000) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        Toast.fire({
            icon,
            title
        });
    }

    /**
     * Muestra un formulario de entrada
     * @param {string} title - Título del formulario
     * @param {string} text - Texto descriptivo
     * @param {string} inputPlaceholder - Placeholder del input
     * @param {Function} callback - Función que recibe el valor ingresado
     */
    export function showInput(
        title = 'Ingrese datos',
        text = '',
        inputPlaceholder = '',
        callback
    ) {
        Swal.fire({
            title,
            text,
            input: 'text',
            inputPlaceholder,
            showCancelButton: true,
            confirmButtonColor: "#0a7399",
            cancelButtonColor: '#f6d860',
            confirmButtonText: 'Aceptar',
            cancelButtonText: '<span style="color: black;">Cancelar</span>'
        }).then((result) => {
            if (result.isConfirmed && callback) {
                callback(result.value);
            }
        });
    }
</script>
