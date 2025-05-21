<!-- Confirmación del pago exitoso -->
<script>
    import { onMount } from 'svelte';
    import BackButton from '$lib/components/common/BackButton.svelte';
    import { page } from '$app/stores'; // Import the page store to access URL parameters

    let shiftId;
    let paymentAmount; // Define a variable for the payment amount

    // Use the page store to get the shift ID from the URL
    onMount(() => {
        shiftId = page.params.id; // Get the ID from the URL parameters
        // Here you should set the paymentAmount based on your logic
        paymentAmount = 25000; // Example amount, replace with actual logic
    });
</script>

<div class="flex justify-between items-center p-4">
    <BackButton />
</div>

<div class="text-center mb-6">
    <h1 class="text-2xl font-bold">Pago Confirmado</h1>
    <p class="mt-2 text-lg">Tu pago ha sido procesado exitosamente.</p>
</div>

<div class="mx-auto max-w-lg bg-white p-5 rounded-lg shadow-md mt-8">
    <h2 class="text-lg font-semibold">Detalles del Turno</h2>
    <div class="grid grid-cols-2 gap-2 my-4">
        <div class="font-semibold">ID del Turno:</div>
        <div>{shiftId}</div>
        <div class="font-semibold">Estado:</div>
        <div>Reservado</div>
        <div class="font-semibold">Precio:</div>
        <div>${paymentAmount}</div>
    </div>

    <div class="flex justify-center mt-6">
        <a href="/shifts" class="btn btn-primary">Volver a la Lista de Turnos</a>
    </div>
</div>

  