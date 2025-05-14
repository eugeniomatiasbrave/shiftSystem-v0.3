<script>
    import * as Alert from './Alert.svelte';
    
    function handleSuccess() {
        Alert.showSuccess('¡Operación exitosa!', 'Los datos se han guardado correctamente.');
    }
    
    function handleError() {
        Alert.showError('Error', 'No se pudo completar la operación.');
    }
    
    function handleConfirm() {
        Alert.showConfirm(
            '¿Eliminar registro?',
            'Esta acción no se puede deshacer',
            () => {
                Alert.showSuccess('Eliminado', 'El registro se ha eliminado correctamente.');
            },
            () => {
                Alert.showInfo('Cancelado', 'El registro no ha sido eliminado.');
            }
        );
    }
    
    function handleInfo() {
        Alert.showInfo('Información', 'Este es un mensaje informativo.');
    }
    
    function handleWarning() {
        Alert.showWarning('Advertencia', 'Esta acción podría tener consecuencias.');
    }
    
    function handleToast() {
        Alert.showToast('Operación completada', 'success');
    }
    
    function handleInput() {
        Alert.showInput(
            'Ingrese su nombre',
            'Necesitamos su nombre para continuar',
            'Nombre completo',
            (value) => {
                Alert.showSuccess('Gracias', `Hola, ${value}!`);
            }
        );
    }
</script>

<div class="p-6 space-y-4">
    <h2 class="text-2xl font-bold">Ejemplos de alertas</h2>
    
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <button class="btn btn-success" on:click={handleSuccess}>
            Alerta de éxito
        </button>
        
        <button class="btn btn-error" on:click={handleError}>
            Alerta de error
        </button>
        
        <button class="btn btn-warning" on:click={handleConfirm}>
            Alerta de confirmación
        </button>
        
        <button class="btn btn-info" on:click={handleInfo}>
            Alerta informativa
        </button>
        
        <button class="btn" on:click={handleWarning}>
            Alerta de advertencia
        </button>
        
        <button class="btn btn-accent" on:click={handleToast}>
            Toast
        </button>
        
        <button class="btn btn-primary" on:click={handleInput}>
            Alerta con input
        </button>
    </div>
</div> 