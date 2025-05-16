<!-- UI de detalle/reserva de turno -->
<script>
 
  import BackButton from "$lib/components/common/BackButton.svelte";
  export let data;

  const { shiftId } = data;
  console.log(shiftId);

  
</script>

<div class="mx-auto max-w-lg bg-white p-5 rounded-lg shadow-md mt-8">
  <BackButton />
  
  <div class="text-center mb-6">
    <h1 class="text-2xl font-bold">Confirmación de Turno</h1>
  </div>
  
  {#if shiftId}
    <div class="card bg-base-100 shadow-sm">
      <div class="card-body">
        <h2 class="card-title">Detalles del Turno</h2>
        
        <div class="grid grid-cols-2 gap-2 my-4">
          <div class="font-semibold">Fecha:</div>
          <div>{shiftId.date}</div>
          
          <div class="font-semibold">Hora:</div>
          <div>{shiftId.time}</div>

          <div class="font-semibold">Estado:</div>
          <div>{shiftId.status}</div>
          
          
        </div>
        
        <div class="alert alert-info shadow-lg mb-4">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Para confirmar este turno, deberás realizar el pago correspondiente.</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="flex justify-between mt-6">
      <a href="/shifts" class="btn btn-outline">Cancelar</a>
      <a href="/shifts/{shiftId.id}/payment" class="btn btn-primary">Proceder al Pago</a>
    </div>
  {:else}
    <div class="alert alert-error">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error al cargar la información del turno. Por favor, inténtalo nuevamente.</span>
      </div>
    </div>
  {/if}
</div>