<script>
   export let data;
   export let form;
   console.log(form)

   import { onMount } from 'svelte';
	
	let showImage = false;
	
	onMount(() => {
	  // Mostrar la imagen después de un pequeño retraso para efecto visual
	  setTimeout(() => {
		showImage = true;
	  }, 500);
	});
   
</script>


{#if data.user}
	{#if data.user.role === 'admin'}
	<section class="bg-purple-50 py-16 md:py-24 min-h-screen">
		<div class="max-w-7xl mx-auto px-6 md:px-12">
			<div class="text-center mb-12">
				<h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
					Hola {data.user.firstName}
				</h1>
				<p class="text-xl text-gray-700 mb-8">
					Envía vales en cualquier momento y lugar
				</p>
				<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
			  <!-- svelte-ignore a11y-invalid-attribute -->
			  <a href="#" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
				  Comenzar 
				</a>
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="#" class="text-gray-700 hover:text-purple-600 transition-colors flex items-center">
					Cómo funciona 
				</a>
			</div>
		</div>
		<div class="mt-16 max-w-4xl mx-auto transition-all duration-500 rounded-xl overflow-hidden shadow-xl {showImage ? 'opacity-100' : 'opacity-0 translate-y-8'}">
			<div class="bg-white p-8 rounded-xl flex flex-col items-center">
				<div class="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
					<div class="text-center p-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-purple-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
						<p class="text-gray-500">Espacio reservado para imagen de sistema de turnos de citas</p>
					</div>
				</div>
				<p class="text-gray-700 text-center">
					Gestiona tus citas y turnos de manera eficiente con nuestro sistema de vouchers
				</p>
			</div>
		</div>
	</div>
	</section>
	{:else}
	<section class="bg-purple-50 py-16 md:py-24 min-h-screen">
		<div class="max-w-7xl mx-auto px-6 md:px-12">
			<div class="text-center mb-12">
				<h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
					Hola {data.user.firstName}
				</h1>
				<p class="text-xl text-gray-700 mb-8">
					Envía vales en cualquier momento y lugar
				</p>
				<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
			  <!-- svelte-ignore a11y-invalid-attribute -->
			  <a href="#" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
				  Comenzar 
				</a>
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="#" class="text-gray-700 hover:text-purple-600 transition-colors flex items-center">
					Cómo funciona 
				</a>
			</div>
		</div>
		<div class="mt-16 max-w-4xl mx-auto transition-all duration-500 rounded-xl overflow-hidden shadow-xl {showImage ? 'opacity-100' : 'opacity-0 translate-y-8'}">
			<div class="bg-white p-8 rounded-xl flex flex-col items-center">
				<div class="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
					<div class="text-center p-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-purple-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
						<p class="text-gray-500">Espacio reservado para imagen de sistema de turnos de citas</p>
					</div>
				</div>
				<p class="text-gray-700 text-center">
					Gestiona tus citas y turnos de manera eficiente con nuestro sistema de vouchers
				</p>
			</div>
		</div>
	</div>
	</section>
			 
{/if}
{:else}
<section class="bg-purple-50 py-16 md:py-24 min-h-screen">
	<div class="max-w-7xl mx-auto px-6 md:px-12">
		<div class="text-center mb-12">
			<h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
				Esquemas de vales simplificados 
			</h1>
			<p class="text-xl text-gray-700 mb-8">
				Envía vales en cualquier momento y lugar
			</p>
			<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
		  <!-- svelte-ignore a11y-invalid-attribute -->
		  <a href="#" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
			  Comenzar 
			</a>
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="#" class="text-gray-700 hover:text-purple-600 transition-colors flex items-center">
				Cómo funciona 
			</a>
		</div>
	</div>
	

	<div class="mt-16 max-w-4xl mx-auto transition-all duration-500 rounded-xl overflow-hidden shadow-xl {showImage ? 'opacity-100' : 'opacity-0 translate-y-8'}">
	
		<div class="bg-white p-8 rounded-xl flex flex-col items-center">
			<div class="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
				<div class="text-center p-4">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-purple-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
					<p class="text-gray-500">Espacio reservado para imagen de sistema de turnos de citas</p>
				</div>
			</div>
			<p class="text-gray-700 text-center">
				Gestiona tus citas y turnos de manera eficiente con nuestro sistema de vouchers
			</p>
		</div>
	</div>
</div>
</section>
{/if}