<!-- Componente de calendario para selección de fechas -->
<script>
  import { onMount, createEventDispatcher } from "svelte";
  import flatpickr from "flatpickr";
  import { Spanish } from "flatpickr/dist/l10n/es.js";
  import "flatpickr/dist/flatpickr.min.css";

  export let selectedDate = "";

  const dispatch = createEventDispatcher();

  let calendar;

  onMount(() => {
    calendar = flatpickr("#calendar-input", {
      dateFormat: "Y-m-d",
      defaultDate: selectedDate || new Date(),
      locale: Spanish,
      minDate: "today",
      disableMobile: false,
      inline: true,
      onChange: (selectedDates) => {
        const newDate = selectedDates[0].toISOString().split("T")[0];
        selectedDate = newDate;
        dispatch("dateChange", newDate);
      },
    });
  });

  function handleInputChange(event) {
    const newDate = event.target.value;
    selectedDate = newDate;
    if (calendar) {
      calendar.setDate(newDate, true); // true to trigger onChange
    }
    dispatch("dateChange", newDate);
  }
</script>

<div class="calendar-container">
  <input
    id="calendar-input"
    type="text"
    bind:value={selectedDate}
    on:change={handleInputChange}
    class="input input-bordered"
    placeholder="Seleccione una fecha"
  />
</div>

<style>
  .calendar-container {
    width: 100%;
    margin-bottom: 1rem;
  }
  :global(.flatpickr-calendar) {
    width: 100%;
    max-width: 325px;
    margin: 0 auto;
  }
</style> 