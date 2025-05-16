<!-- UI para realizar el pago del turno -->
<script>
  import { onMount } from "svelte";
  import BackButton from "$lib/components/common/BackButton.svelte";
  import PaymentMethodSelector from "$lib/components/payment/PaymentMethodSelector.svelte";
  import PaymentSummary from "$lib/components/payment/PaymentSummary.svelte";
  import CreditCardForm from "$lib/components/payment/PaymentMethods/CreditCardForm.svelte";
  import MercadoPagoForm from "$lib/components/payment/PaymentMethods/MercadoPagoForm.svelte";
  
  export let data;
  
  let shift = data.shift;
  let selectedPaymentMethod = "creditCard"; // Default payment method
  let loading = false;
  let errorMessage = "";
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  function handlePaymentMethodChange(event) {
    selectedPaymentMethod = event.detail;
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    loading = true;
    errorMessage = "";
    
    try {
      // Simulating payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to confirmation page
      window.location.href = `/shifts/${shift.id}/payment/confirmation`;
    } catch (error) {
      errorMessage = "Error al procesar el pago. Por favor, inténtalo nuevamente.";
      loading = false;
    }
  }
</script>

<div class="mx-auto max-w-lg bg-white p-5 rounded-lg shadow-md mt-8">
  <BackButton />
  
  <div class="text-center mb-6">
    <h1 class="text-2xl font-bold">Pago de Turno</h1>
  </div>
  
  {#if shift}
    <PaymentSummary 
      appointmentDate={formatDate(shift.date)} 
      appointmentTime={shift.time}
      doctorName={shift.professional_name}
      specialty={shift.specialty}
      amount={shift.price} 
    />
    
    <form on:submit={handleSubmit} class="mt-6">
      <div class="mb-4">
        <h2 class="text-lg font-semibold mb-2">Método de Pago</h2>
        <PaymentMethodSelector 
          on:methodChange={handlePaymentMethodChange} 
          selectedMethod={selectedPaymentMethod} 
        />
      </div>
      
      <div class="mb-6">
        {#if selectedPaymentMethod === "creditCard"}
          <CreditCardForm />
        {:else if selectedPaymentMethod === "mercadoPago"}
          <MercadoPagoForm />
        {/if}
      </div>
      
      {#if errorMessage}
        <div class="alert alert-error mb-4">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errorMessage}</span>
          </div>
        </div>
      {/if}
      
      <div class="flex justify-between">
        <a href="/shifts/{shift.id}" class="btn btn-outline">Volver</a>
        <button type="submit" class="btn btn-primary" disabled={loading}>
          {#if loading}
            <span class="loading loading-spinner"></span>
            Procesando...
          {:else}
            Confirmar Pago
          {/if}
        </button>
      </div>
    </form>
  {:else}
    <div class="alert alert-error">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error al cargar la información del turno. Por favor, inténtalo nuevamente.</span>
      </div>
    </div>
  {/if}
</div>