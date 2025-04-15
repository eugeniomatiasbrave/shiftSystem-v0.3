<script>
  export let data;
  const {shifts} = data;

  let hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  let duration = ["30 min","40 min", "45 min", "60 min"];
  let status = 'Vacant';
  let statusOptions = ['Vacant', 'Reserved', 'Cancelled'];
  let price = 20000;
  let description = 'Terapia individual';
  //un turno
  let selectedDate = '';
  let dayOfWeek = '';

  let filteredShifts = [];
  let selectedDateTable = '';

  function getCurrentDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  function filterShiftsByDate(date) {
    filteredShifts = shifts.filter(shift => {
      const shiftDate = new Date(shift.date).toISOString().split('T')[0];
      return shiftDate === date; // filtro tambien por estado 'Vacant'
    });
  }

  function formatDate(dateString) {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  }

  $: {
    const currentDate = getCurrentDate();
    selectedDate = currentDate;
	selectedDateTable = currentDate;
    filterShiftsByDate(currentDate);
  }
  
  function updateDayOfWeek(event) {
    const daysOfWeek = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const date = new Date(event.target.value);
    dayOfWeek = daysOfWeek[date.getDay()];
  }

  function handleDateChange(event) {
    selectedDate = event.target.value;
    console.log('Selected Date:', selectedDate);
    filterShiftsByDate(selectedDate);
  }

</script>

<h1 class="my-10 text-4xl font-bold text-center text-white">Crud Admin Shift</h1>
<form method="POST" action="?/oneShift" class="space-y-4 bg-slate-100 p-2 rounded">
  <table class="table-auto w-full p-2">
    <thead>
      <tr>
        <th>Date</th>
        <th>Day of Week</th>
        <th>Time</th>
        <th>Duration</th>
        <th>Status</th>
        <th>Price</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <input type="date" name="date" bind:value={selectedDate} on:change={updateDayOfWeek} class="input input-bordered" />
        </td>
        <td>
          <input type="text" name="dayOfWeek" bind:value={dayOfWeek} placeholder="Day" readonly class="input input-bordered"/>
        </td>
        <td>
          <select name="hour" class="select select-bordered" required>
            {#each hours as hour}
              <option value={hour}>{hour}</option>
            {/each}
          </select>
        </td>
        <td>
          <select name="duration" class="select select-bordered">
            {#each duration as dur}
              <option value={dur}>{dur}</option>
            {/each}
          </select>
        </td>
        <td>
          <input type="text" name="status"  bind:value={status} class="input input-bordered">
        </td>
        <td>
          <input type="number" name="price" bind:value={price} class="input input-bordered">
        </td>
        <td>
          <input type="text" name="description" bind:value={description} class="input input-bordered">
        </td>
        <td class="text-center">
          <button type="submit" class="btn btn-info text-white">Create a shift</button>
        </td> 
      </tr>
    </tbody>
  </table>
</form>

<div class="my-2"></div>

<form  method="POST" action="?/dayShifts" class="space-y-4 bg-slate-100 p-2 rounded">
	<input type="date" bind:value={selectedDateTable} on:change={handleDateChange} class="input input-bordered">
  <table class="table-auto w-full p-2">
    <thead>
      <tr>
        <th>Date </th>
        <th>Day of Week</th>
        <th>Time</th>
        <th>Duration</th>
        <th>Status</th>
        <th>Price</th>
        <th>Description</th>
        <th>Edit Shift</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredShifts as shift (shift._id)}
          <tr>
			  <td>{formatDate(shift.date)}</td>
              <td>{shift.dayOfWeek}</td>
              <td>{shift.hour}</td>
              <td>
                  <select name="duration" class="select select-bordered" form="edit-{shift._id}">
                      {#each duration as dur}
                          <option value={dur} selected={dur === shift.duration}>{dur}</option>
                      {/each}
                  </select>
              </td>
              <td>
                <select 
				    name="status" 
					class={`select select-bordered ${shift.status === 'Vacant' ? 'bg-yellow-500' : shift.status === 'Reserved' ? 'bg-green-500' : shift.status === 'Cancelled' ? 'bg-red-400' : '' } `} 
					form="edit-{shift._id}">

                    {#each statusOptions as st}
                      <option value={st} selected={st === shift.status} >{st}</option>
                    {/each}
              </select>
              </td>
              <td>
                  <input type="number" name="price" value={shift.price} class="input input-bordered" form="edit-{shift._id}" />
              </td>
              <td>
                  <input type="text" name="description" value={shift.description} class="input input-bordered" form="edit-{shift._id}" />
              </td>
              <td class="text-center">
                  <form id="edit-{shift._id}" method="POST" action="?/editShift">
                      <input type="hidden" name="sid" value={shift._id} />
                      <button type="submit" class="btn btn-info text-white">Edit a shift</button>
                  </form>
              </td>
          </tr>
      {/each}
  </tbody>
</table>
</form>

<style>
    .btn-fixed-width {
        width: 100px; 
    }
</style>