<!-- Componente de calendario para selección de fechas -->
<script>
  import { onMount, createEventDispatcher } from "svelte";
  import flatpickr from "flatpickr";
  import "flatpickr/dist/flatpickr.min.css";

  export let selectedDate = "";

  const dispatch = createEventDispatcher();

  let calendar;

  onMount(() => {
    calendar = flatpickr("#calendar-input", {
      dateFormat: "Y-m-d",
      defaultDate: selectedDate || new Date(),
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

<input
  id="calendar-input"
  type="text"
  bind:value={selectedDate}
  on:change={handleInputChange}
  class="input input-bordered"
/> 