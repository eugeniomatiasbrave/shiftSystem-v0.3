<!-- Vista de selección de turnos -->

<script>
	import { onMount } from "svelte";
	import BackButton from "$lib/components/common/BackButton.svelte";
	import ShiftCalendar from "$lib/components/shifts/ShiftCalendar.svelte";
	import ShiftList from "$lib/components/shifts/ShiftList.svelte";
	
	export let data;
	const { shifts } = data;
	//console.log(shifts);
	
	let selectedDate = getCurrentDate(); // Initialize with current date
	let filteredShifts = []; // Inicializa el array filtrado
	let selectedShiftId = null; // Variable to store the id_shift from the form
	
	// Función para obtener la fecha actual en formato YYYY-MM-DD
	function getCurrentDate() {
		const today = new Date();
		return today.toISOString().split('T')[0];
	}
	
	function filterShiftsByDate(date) {
		if (!Array.isArray(shifts.data)) {
			console.error('shifts.data is not an array:', shifts.data);
			filteredShifts = [];
			return;
		}
	
		filteredShifts = shifts.data.reduce((acc, shift) => {
			const shiftDate = new Date(shift.date).toISOString().split('T')[0];
			if (shiftDate === date && shift.status === 'available') {
				acc.push(shift);
			}
			return acc;
		}, []);
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
	
	function handleShiftSelected(event) {
		selectedShiftId = event.detail;
		// console.log("Selected Shift ID in page:", selectedShiftId);
	}
</script>

<div class="mx-auto bg-white p-5 rounded-lg shadow-md mt-16">
	<BackButton></BackButton>
	<div class="mt-3">
		<ShiftCalendar bind:selectedDate on:dateChange={handleDateChange} />
		<h2 class="text-3xl font-bold text-center mt-4 mb-2">Turnos disponibles</h2>
		<!-- Hidden input to send selectedShiftId with the form -->
		<input type="hidden" name="id_shift" bind:value={selectedShiftId} />
		<ShiftList shifts={filteredShifts} on:shiftSelected={handleShiftSelected} />
		<div class="flex-auto">
			<div class="mt-3 form-control">
				<a href={`/shifts/${selectedShiftId}`} class="btn btn-info" >Reserve</a>
			</div>
			<div class="mt-3 form-control">
				<a href="/shifts/my-appointments" class="btn btn-secondary">Volver</a>
			</div>
		</div>
	</div>
</div>