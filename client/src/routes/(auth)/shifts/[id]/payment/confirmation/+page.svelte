<!-- Confirmación del pago exitoso -->
<script>
  import { onMount } from "svelte";
  import PaymentConfirmation from "$lib/components/payment/PaymentConfirmation.svelte";
  
  export let data;
  
  let shift = data.shift;
  let payment = data.payment;
  let loading = false;
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  // Function to copy appointment details to clipboard
  function copyToClipboard() {
    if (!shift) return;
    
    const text = `
      Confirmación de Turno
      
      Fecha: ${formatDate(shift.date)}
      Hora: ${shift.time}
      Profesional: ${shift.professional_name}
      Especialidad: ${shift.specialty}
      Número de confirmación: ${payment.confirmation_number}
      
      ¡Gracias por confiar en nosotros!
    `;
    
    navigator.clipboard.writeText(text);
    alert("Detalles del turno copiados al portapapeles");
  }
</script>

<div class="mx-auto max-w-lg bg-white p-5 rounded-lg shadow-md mt-8">
  <div class="text-center mb-6">
    <h1 class="text-2xl font-bold">¡Pago Completado!</h1>
  </div>
  
  {#if shift && payment}
    <div class="flex justify-center mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    
    <PaymentConfirmation 
      appointmentDate={formatDate(shift.date)} 
      appointmentTime={shift.time}
      doctorName={shift.professional_name}
      specialty={shift.specialty}
      amount={payment.amount}
      paymentMethod={payment.method}
      confirmationNumber={payment.confirmation_number}
      transactionDate={payment.transaction_date}
    />
    
    <div class="alert alert-success mt-6">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Hemos enviado un correo electrónico con los detalles de tu turno.</span>
      </div>
    </div>
    
    <div class="flex flex-col gap-3 mt-6">
      <button class="btn btn-outline" on:click={copyToClipboard}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        Copiar detalles
      </button>
      
      <a href="/my-appointments" class="btn btn-primary">
        Ver Mis Turnos
      </a>
      
      <a href="/" class="btn btn-ghost">
        Volver al Inicio
      </a>
    </div>
  {:else}
    <div class="alert alert-error">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error al cargar la información del turno. Por favor, contacta a soporte.</span>
      </div>
    </div>
  {/if}
</div>