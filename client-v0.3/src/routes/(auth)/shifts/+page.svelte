<script>
import { onMount } from "svelte";
import BackButton from "$lib/components/BackButton.svelte";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"; // Importa los estilos de Flatpickr

export let data;
const { shifts } = data;
console.log(shifts);

let selectedDate = '';
let filteredShifts = []; // Inicializa el array filtrado
let newStatus = 'reserved'; // Estado por defecto al reservar

// Función para obtener la fecha actual en formato YYYY-MM-DD
function getCurrentDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}


function filterShiftsByDate(date) {
    if (!Array.isArray(shifts.data)) {
        console.error('shifts is not an array:', shifts);
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

$: {
    const currentDate = getCurrentDate();
    selectedDate = currentDate; // Establecer la fecha actual como valor por defecto
    filterShiftsByDate(currentDate);
}

function handleDateChange(event) {
  selectedDate = event.target.value;
  console.log('Selected Date:', selectedDate);
  filterShiftsByDate(selectedDate);
}

function handleCheckboxChange(event, shift) {
    if (event.target.checked) {
      shift.status = 'reserved';
    } else {
        // Si se deselecciona el checkbox, se restablece el estado a 'available'
        shift.status = 'available';
    }
}

// Inicializar Flatpickr
let calendar;
onMount(() => {
    calendar = flatpickr("#calendar", {
        dateFormat: "Y-m-d",
        defaultDate: new Date(),
        onChange: (selectedDates) => {
            selectedDate = selectedDates[0].toISOString().split('T')[0];
            filterShiftsByDate(selectedDate);
        },
    });
});
</script>

<h1 class="my-4 text-4xl font-bold text-center text-white">Page Shift</h1>
<div class="mx-auto bg-white p-5 rounded-lg shadow-md">
<BackButton></BackButton>
<form method="POST"  action="?/reserve" class="mt-3">
  <input id="calendar" type="text" bind:value={selectedDate} on:change={handleDateChange} class="input input-bordered" />
<h1 class="text-3xl font-bold text-center">TURNOS DISPONIBLES</h1>
<div class="mx-auto bg-white p-2 my-2 rounded-lg shadow-md">
  <table class="table w-full">
    <thead class="text-center">
      <tr>
        <th>Select</th>
        <th>Date</th>
        <th>Time</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody class="text-center">
      {#each filteredShifts as shift}
        <tr class="hover">
          <td>
            <input type="checkbox" class="checkbox checkbox-sm" on:change={(event) => handleCheckboxChange(event,shift)} />
          </td>
          <input type="hidden" name="id" value={shift.id_shift}>
          <td>{shift.date}</td>
          <td>{shift.time}</td>
          <td>{shift.status}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
<input type="hidden" name="status" value={newStatus}> <!-- Estado por defecto al reservar -->
<div class="flex-auto">
  <div class="mt-3 form-control">
    <button type="submit" class="btn btn-info">Reserve</button>
  </div>
  <div class="mt-3 form-control">
    <a href="/shifts/myShifts" class="btn btn-secondary">Cancel</a>
  </div>
</div>
</form>
</div>