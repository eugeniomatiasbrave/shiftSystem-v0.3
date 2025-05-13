<!-- Lista de turnos disponibles -->
<script>
  export let shifts = [];
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let selectedShiftId = null;

  function handleShiftSelection(shiftId) {
    selectedShiftId = shiftId;
    dispatch('shiftSelected', selectedShiftId);
  }
</script>

{#if shifts.length > 0}
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
        {#each shifts as shift (shift.id_shift)}
          <tr class="hover">
            <td>
              <input
                type="radio"
                name="id_shift"
                value={shift.id_shift}
                on:change={() => handleShiftSelection(shift.id_shift)}
                checked={selectedShiftId === shift.id_shift}
              />
            </td>
            <td>{new Date(shift.date).toISOString().split('T')[0]}</td>
            <td>{shift.time}</td>
            <td>{shift.status}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p class="text-center my-4">No shifts available for the selected date.</p>
{/if} 
