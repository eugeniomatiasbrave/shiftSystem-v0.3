<script>
	import BackButton from '$lib/components/common/BackButton.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
	export let form;
	const { payment, shift } = data;
	
	// Comprobar si hay mensajes de éxito o error en la URL
	const success = $page.url.searchParams.get('success') === 'true';
</script>

<div class="flex justify-between items-center p-4">
	<BackButton />
</div>

<div class="text-center mb-6">
	<h1 class="text-2xl font-bold">Confirmación de Pago</h1>
	
	{#if success}
		<div class="mt-2 p-2 bg-green-100 text-green-700 rounded">
			¡El pago ha sido confirmado exitosamente!
		</div>
	{:else if form?.error}
		<div class="mt-2 p-2 bg-red-100 text-red-700 rounded">
			{form.error}
		</div>
	{/if}
</div>

<div class="mx-auto max-w-lg bg-white p-5 rounded-lg shadow-md mt-8">
	<h2 class="text-lg font-semibold">Estado del Pago</h2>
	
	<div class="my-4 text-center">
		{#if payment.payment_status === 'completed'}
			<div class="text-green-600 text-xl">
				<span class="material-icons text-4xl">check_circle</span>
				<p>¡Pago Completado!</p>
			</div>
		{:else if payment.payment_status === 'pending_payment'}
			<div class="text-yellow-600 text-xl">
				<span class="material-icons text-4xl">pending</span>
				<p>Pago Pendiente</p>
				<p class="text-sm mt-2">Su pago está siendo procesado. Por favor, espere...</p>
				
				<!-- Botón para simular confirmación de pago (solo para modo prueba) -->
				<form method="POST" class="mt-4">
					<input type="hidden" name="action" value="confirm_payment">
					<button type="submit" class="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600">
						Simular Confirmación de Pago
					</button>
				</form>
			</div>
		{:else if payment.payment_status === 'failed'}
			<div class="text-red-600 text-xl">
				<span class="material-icons text-4xl">error</span>
				<p>Pago Fallido</p>
				<p class="text-sm mt-2">Ha ocurrido un error al procesar su pago.</p>
				<a href="/shifts" class="inline-block mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600">
					Buscar otro turno
				</a>
			</div>
		{:else if payment.payment_status === 'refunded'}
			<div class="text-orange-600 text-xl">
				<span class="material-icons text-4xl">monetization_on</span>
				<p>Pago Reembolsado</p>
				<p class="text-sm mt-2">El pago ha sido reembolsado.</p>
			</div>
		{:else}
			<div class="text-red-600 text-xl">
				<span class="material-icons text-4xl">help</span>
				<p>Estado: {payment.payment_status}</p>
			</div>
		{/if}
	</div>

	<div class="grid grid-cols-2 gap-2 my-4">
		<div class="font-semibold">ID de Pago:</div>
		<div>{payment.id_payment}</div>
		<div class="font-semibold">Monto:</div>
		<div>${payment.amount} {payment.currency}</div>
		<div class="font-semibold">Método de Pago:</div>
		<div>{payment.payment_method}</div>
		<div class="font-semibold">Fecha:</div>
		<div>{new Date(payment.created_at).toLocaleString()}</div>
	</div>

	<div class="mt-6">
		<h3 class="text-lg font-semibold">Detalles del Turno</h3>
		<div class="grid grid-cols-2 gap-2 my-4">
			<div class="font-semibold">Fecha:</div>
			<div>{shift.date}</div>
			<div class="font-semibold">Hora:</div>
			<div>{shift.time}</div>
			<div class="font-semibold">Estado:</div>
			<div class="font-medium {shift.status === 'reserved' ? 'text-green-600' : shift.status === 'pending_payment' ? 'text-yellow-600' : 'text-gray-800'}">
				{shift.status}
			</div>
		</div>
	</div>

	<div class="mt-6 flex justify-center space-x-4">
		<button 
			onclick={() => goto('/shifts')} 
			class="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600">
			Ver Mis Turnos
		</button>
		
		{#if payment.payment_status === 'completed'}
			<button
				onclick={() => goto('/dashboard')}
				class="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600">
				Ir al Dashboard
			</button>
		{/if}
	</div>
</div> 