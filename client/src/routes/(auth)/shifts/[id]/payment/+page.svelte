<!-- UI para realizar el pago del turno -->
<script>

  import BackButton from "$lib/components/common/BackButton.svelte";
  
  export let data;
  export let form;

  let number_reference = '';
  let expiry_date = '';
  let security_code = '';
  
  let isSubmitting = false;
  let paymentMethod = 'credit_card';
  
  function handleSubmit() {
    isSubmitting = true;
  }
</script>

<div class="mx-auto max-w-lg bg-white p-6 rounded-lg shadow-md mt-8">
  <BackButton />
  
  <div class="text-center mb-6">
    <h1 class="text-2xl font-bold">Procesamiento de Pago</h1>
  </div>
  
  {#if form?.error}
    <div class="alert alert-error shadow-lg mb-4">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{form.error}</span>
      </div>
    </div>
  {/if}
  
  {#if data.shiftData}
    <div class="card bg-base-100 shadow-sm mb-6">
      <div class="card-body">
        <h2 class="card-title mb-4">Resumen de la Reserva</h2>
        
        <div class="grid grid-cols-2 gap-3 mb-4">
          <div class="font-semibold">Fecha:</div>
          <div>{new Date(data.shiftData.date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
          
          <div class="font-semibold">Hora:</div>
          <div>{data.shiftData.time}</div>
          
          <div class="font-semibold">Total a Pagar:</div>
          <div class="text-primary font-bold">${data.shiftData.amount}</div>
        </div>
      </div>
    </div>
    
    <div class="card bg-base-100 shadow-sm mb-6">
      <div class="card-body">
        <h2 class="card-title mb-4">Información de Pago</h2>
        
        <form method="POST" on:submit={handleSubmit}>
          <input type="hidden" name="id_shift" value={data.shiftData.id_shift} />
          <input type="hidden" name="amount" value={data.shiftData.amount} />
          
          <div class="form-control mb-4">
            <label class="label" for="payment_method">
              <span class="label-text">Método de Pago</span>
            </label>
            <select id="payment_method" bind:value={paymentMethod} name="payment_method" class="select select-bordered w-full">
              <option value="credit_card">Tarjeta de Crédito</option>
              <option value="debit_card">Tarjeta de Débito</option>
              <option value="transfer">Transferencia Bancaria</option>
            </select>
          </div>
          
          <div class="form-control mb-4">
            <label class="label" for="number_reference">
              <span class="label-text">Número de Tarjeta/Referencia</span>
            </label>
            <input type="text" id="number_reference" name="number_reference" value={number_reference} placeholder="Ingrese los 16 digitos de la tarjeta" class="input input-bordered" required />
          </div>
          
          {#if paymentMethod === 'credit_card' || paymentMethod === 'debit_card'}
            <div class="grid grid-cols-2 gap-4">
              <div class="form-control mb-4">
                <label class="label" for="expiry_date">
                  <span class="label-text">Fecha de Expiración</span>
                </label>
                <input type="text" id="expiry_date" name="expiry_date" value={expiry_date} placeholder="MM/AA" class="input input-bordered" />
              </div>
              
              <div class="form-control mb-4">
                <label class="label" for="security_code">
                  <span class="label-text">Código de Seguridad</span>
                </label>
                <input type="text" id="security_code" name="security_code" value={security_code} placeholder="CVV" class="input input-bordered" />
              </div>
            </div>
          {/if}
          
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary w-full" disabled={isSubmitting}>
              {#if isSubmitting}
                <span class="loading loading-spinner loading-xs mr-2"></span>
              {/if}
              Procesar Pago de ${data.shiftData.amount}
            </button>
          </div>
        </form>
      </div>
    </div>
  {:else}
    <div class="alert alert-error shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>No se encontró información del turno. Por favor, intenta nuevamente.</span>
      </div>
    </div>
    <div class="flex justify-center mt-6">
      <a href="/shifts" class="btn btn-primary">Volver a los Turnos</a>
    </div>
  {/if}
</div>

