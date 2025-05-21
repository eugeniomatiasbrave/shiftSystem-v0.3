<!-- Vista de selección de turnos -->

<script>
	import { onMount } from "svelte";
	import BackButton from "$lib/components/common/BackButton.svelte";
	import ShiftCalendar from "$lib/components/shifts/ShiftCalendar.svelte";
	
	export let data;
	const { shifts } = data;
	
	let selectedDate = getCurrentDate(); // Initialize with current date
	let filteredShifts = []; // Inicializa el array filtrado
	let selectedShiftId = null; // Variable to store the id_shift from the form
	let loading = false;
	
	// Función para obtener la fecha actual en formato YYYY-MM-DD
	function getCurrentDate() {
		const today = new Date();
		return today.toISOString().split('T')[0];
	}
	
	function filterShiftsByDate(date) {
		loading = true;
		
		if (!Array.isArray(shifts.data)) {
			console.error('shifts.data is not an array:', shifts.data);
			filteredShifts = [];
			loading = false;
			return;
		}
	
		filteredShifts = shifts.data.reduce((acc, shift) => {
			const shiftDate = new Date(shift.date).toISOString().split('T')[0];
			if (shiftDate === date && shift.status === 'available') {
				acc.push(shift);
			}
			return acc;
		}, []);
		
		loading = false;
	}
	
	// Initialize with current date's shifts
	onMount(() => {
		filterShiftsByDate(selectedDate);
	});
	
	function handleDateChange(event) {
		selectedDate = event.detail;
		filterShiftsByDate(selectedDate);
		selectedShiftId = null; // Reset selected shift when date changes
	}
	
	function handleShiftSelection(shiftId) {
		selectedShiftId = shiftId;
	}
	
	function formatDate(dateString) {
		const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString('es-ES', options);
	}
</script>

<div class="mx-auto bg-white p-5 rounded-lg shadow-md mt-16 max-w-4xl">
	<BackButton></BackButton>
	<div class="mt-3">
		<h1 class="text-3xl font-bold text-center mb-6">Reserva tu Turno</h1>
		
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div class="calendar-section">
				<h2 class="text-xl font-semibold mb-4">Selecciona una fecha</h2>
				<ShiftCalendar bind:selectedDate on:dateChange={handleDateChange} />
				<p class="text-sm text-gray-600 mt-2">Fecha seleccionada: {formatDate(selectedDate)}</p>
			</div>
			
			<div class="shifts-section">
				<h2 class="text-xl font-semibold mb-4">Turnos disponibles</h2>
				
				{#if loading}
					<div class="flex justify-center my-10">
						<span class="loading loading-spinner loading-lg"></span>
					</div>
				{:else if filteredShifts.length > 0}
					<div class="overflow-x-auto">
						<table class="table w-full">
							<thead>
								<tr>
									<th>Hora</th>
									<th>Precio</th>
									<th>Seleccionar</th>
								</tr>
							</thead>
							<tbody>
								{#each filteredShifts as shift (shift.id_shift)}
									<tr class="hover cursor-pointer {selectedShiftId === shift.id_shift ? 'bg-primary bg-opacity-20' : ''}" 
										on:click={() => handleShiftSelection(shift.id_shift)}>
										<td>{shift.time}</td>
										<td>${shift.amount}</td>
										<td>
											<input
												type="radio"
												name="id_shift"
												value={shift.id_shift}
												on:change={() => handleShiftSelection(shift.id_shift)}
												checked={selectedShiftId === shift.id_shift}
												class="radio radio-primary"
											/>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{:else}
					<div class="alert alert-info">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
						<span>No hay turnos disponibles para esta fecha.</span>
					</div>
				{/if}
			</div>
		</div>

		<!-- Hidden input to send selectedShiftId with the form -->
		<input type="hidden" name="id_shift" bind:value={selectedShiftId} />
		
		<div class="mt-8 flex justify-between">
			<a href="/shifts/my-appointments" class="btn btn-secondary">Mis citas</a>
			<a 
				href={selectedShiftId ? `/shifts/${selectedShiftId}` : null} 
				class="btn btn-primary {!selectedShiftId ? 'btn-disabled' : ''}"
			>
				Reservar turno
			</a>
		</div>
	</div>
</div>

<style>
	.calendar-section, .shifts-section {
		background-color: #f8f9fa;
		padding: 1.5rem;
		border-radius: 0.5rem;
		box-shadow: 0 1px 3px rgba(0,0,0,0.12);
	}
</style>