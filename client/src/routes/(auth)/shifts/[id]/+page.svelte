<!-- UI de detalle/reserva de turno -->
<script>
	import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import BackButton from "$lib/components/common/BackButton.svelte";
  import { reservationStatus, 
    startReservationProcess, 
    setReservationSuccess, 
    setReservationFailure, 
    resetReservationState } from '$lib/store/shifts.js';
  
  export let data;
  export let form;

  const { shiftId, error } = data;
  let isSubmitting = false;
  let status = { error: null, isProcessing: false, isSuccessful: false, shiftData: null };

  // Suscribirse al store
  const unsubscribe = reservationStatus.subscribe(value => {
    status = value;
  });

  // Limpiar suscripción al desmontar
  onMount(() => {
    // Limpiar errores previos al montar el componente
    if (status.error) {
      resetReservationState();
    }
    
    // Si hay datos de turno en el store, actualizar la UI
    if (status.shiftData) {
      setReservationSuccess(shiftId);
    }

    // Si hay error en los datos iniciales, actualizarlo en el store
    if (error && !status.error) {
      setReservationFailure(error);
    }

    return () => {
      unsubscribe();
    };
  });

  // Manejar la redirección en el cliente después de una reserva exitosa
  $: if (browser && (form?.success || status.isSuccessful) && shiftId) {
    try {
      goto(`/shifts/${shiftId.id_shift}/payment`);
    } catch (error) {
      setReservationFailure("Error al redirigir: " + error.message);
    }
  }
  
  // Manejar errores de formulario solo cuando cambia form
  $: if (form?.error && !status.error) {
    setReservationFailure(form.error);
  }
  
  function formatDate(dateString) {
    if (!dateString) return '';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  }
  
  function handleSubmit() {
    isSubmitting = true;
    // Reiniciar cualquier error antes de iniciar un nuevo proceso
    if (status.error) {
      // Si hay un error previo, limpiarlo antes de iniciar un nuevo proceso
      resetReservationState();
    }
    startReservationProcess();
  }
</script>

<div class="mx-auto max-w-lg bg-white p-6 rounded-lg shadow-md mt-8">
  <BackButton />
  
  <div class="text-center mb-6">
    <h1 class="text-2xl font-bold">Confirmación de Turno</h1>
  </div>
  
  {#if error || form?.error || status.error}
    <div class="alert alert-error shadow-lg mb-4">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{status.error || form?.error || error}</span>
      </div>
    </div>
    <div class="flex justify-center mt-6">
      <a href="/shifts" class="btn btn-primary">Volver a los Turnos</a>
    </div>
  {:else if shiftId}
    <div class="card bg-base-100 shadow-sm mb-6">
      <div class="card-body">
        <h2 class="card-title mb-4">Detalles del Turno</h2>
        
        <div class="grid grid-cols-2 gap-3 mb-4">
          <div class="font-semibold">Fecha:</div>
          <div>{formatDate(shiftId.date)}</div>
          
          <div class="font-semibold">Hora:</div>
          <div>{shiftId.time}</div>
          
          <div class="font-semibold">Precio:</div>
          <div>${shiftId.amount}</div>
          
          <div class="font-semibold">Estado:</div>
          <div>{shiftId.status === 'available' ? 'Disponible' : 'Reservado'}</div>
        </div>
        
        {#if shiftId.status === 'available'}
          <div class="alert alert-info shadow-lg mb-4">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Para confirmar este turno, deberás realizar el pago correspondiente.</span>
            </div>
          </div>
        {:else}
          <div class="alert alert-success shadow-lg mb-4">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Este turno ya ha sido reservado. Procede al pago.</span>
            </div>
          </div>
        {/if}
      </div>
    </div>
    
    <div class="flex justify-between mt-6">
      <a href="/shifts" class="btn btn-outline">Cancelar</a>
      {#if shiftId.status === 'available'}
        <form method="POST" on:submit={handleSubmit}>
          <input type="hidden" name="id_shift" value={shiftId.id_shift} />
          <button type="submit" class="btn btn-primary" disabled={isSubmitting || status.isProcessing}>
            {#if isSubmitting || status.isProcessing}
              <span class="loading loading-spinner loading-xs mr-2"></span>
            {/if}
            Proceder al Pago
          </button>
        </form>
      {:else}
        <a href={`/shifts/${shiftId.id_shift}/payment`} class="btn btn-primary">
          Ir al Pago
        </a>
      {/if}
    </div>
  {:else}
    <div class="alert alert-error shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>No se pudo cargar la información del turno. Por favor, inténtalo de nuevo.</span>
      </div>
    </div>
    <div class="flex justify-center mt-6">
      <a href="/shifts" class="btn btn-primary">Volver a los Turnos</a>
    </div>
  {/if}
</div>